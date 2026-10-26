const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Channel = require('../models/Channel');
const Membership = require('../models/Membership');
const Message = require('../models/Message');

let ioInstance = null;

// Map to track connection counts per user ID: Map<userIdString, connectionCount>
const userConnections = new Map();

// Map to track active WebRTC call sessions: Map<sessionKey, sessionData>
const activeCalls = new Map();

// Map to track active LiveKit call sessions
const activeLiveKitCalls = new Map();

/**
 * Record a call history message in MongoDB and broadcast to conversation participants
 */
const recordCallMessage = async ({
  callerId,
  receiverId,
  callType = 'audio',
  status = 'ended',
  duration = 0,
  conversationId,
  orgId,
}) => {
  try {
    const Message = require('../models/Message');
    const Conversation = require('../models/Conversation');

    if (!callerId || !receiverId) return null;

    let conv = null;
    if (conversationId && mongoose.Types.ObjectId.isValid(conversationId)) {
      conv = await Conversation.findById(conversationId);
    }
    if (!conv) {
      conv = await Conversation.findOne({
        participants: { $all: [callerId, receiverId], $size: 2 },
      });
    }

    if (!conv) return null;

    const callContent = callType === 'video' ? '📹 Video Call' : '📞 Audio Call';

    const newMessage = await Message.create({
      organization: conv.organization || orgId,
      conversationId: conv._id,
      sender: callerId,
      receiver: receiverId,
      messageType: 'call',
      content: callContent,
      call: {
        callType: callType === 'video' ? 'video' : 'audio',
        status,
        duration: Math.max(0, duration),
      },
      isRead: false,
    });

    conv.lastMessage = newMessage._id;
    conv.lastMessageAt = newMessage.createdAt;
    await conv.save();

    const populatedMessage = await Message.findById(newMessage._id).populate(
      'sender receiver',
      'name email avatar'
    );

    if (ioInstance) {
      const rooms = [
        `conversation:${conv._id.toString()}`,
        `user:${callerId.toString()}`,
        `user:${receiverId.toString()}`,
      ];
      ioInstance.to(rooms).emit('message:new', {
        message: populatedMessage,
      });
    }

    return populatedMessage;
  } catch (err) {
    console.error('Error recording call message:', err.message);
    return null;
  }
};

/**
 * Initialize Socket.IO with authentication middleware and event handlers
 * @param {import('socket.io').Server} io
 */
const initSocket = (io) => {
  ioInstance = io;

  // 1. Socket Authentication Middleware (JWT Handshake Verification)
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      // Verify JWT using server secret
      const JWT_SECRET = process.env.JWT_SECRET || 'flock_secret_jwt_key_2026_super_secure_token_auth';
      const decoded = jwt.verify(token, JWT_SECRET);

      // Verify user exists in database
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      // Attach authenticated user information to socket instance
      socket.user = user;
      socket.userId = user._id.toString();

      next();
    } catch (error) {
      console.error('Socket Authentication Error:', error.message);
      return next(new Error('Authentication error: Invalid or expired token'));
    }
  });

  // 2. Connection Handler
  io.on('connection', async (socket) => {
    const userId = socket.userId;
    const orgId = socket.user.currentOrganization?.toString();
    console.log(`[Socket Connected] User: ${socket.user.name} (${userId}) | Org: ${orgId || 'None'} | Socket ID: ${socket.id}`);

    // Join personal user room (user:<userId>) for direct notifications
    socket.join(`user:${userId}`);

    // Join active company room (company:<companyId>) if user has an active company
    if (orgId) {
      socket.join(`company:${orgId}`);
    }

    User.updateOne({ _id: userId }, { $set: { lastSeenAt: null } }).catch((error) => {
      console.error('Presence update error:', error.message);
    });

    const joinOrgPresence = async (targetOrgId) => {
      if (!targetOrgId) return;
      const connectionKey = `${userId}_${targetOrgId}`;
      const currentCount = userConnections.get(connectionKey) || 0;
      userConnections.set(connectionKey, currentCount + 1);

      if (currentCount === 0 && socket.user.settings?.privacy?.onlineStatus !== false) {
        io.to(`company:${targetOrgId}`).emit('user:online', {
          userId,
          userName: socket.user.name,
        });
      }

      try {
        const orgMemberships = await Membership.find({
          organization: targetOrgId,
          status: 'active',
        }).populate('user');
        
        const orgMemberIds = orgMemberships
          .filter((m) => m.user && m.user.settings?.privacy?.onlineStatus !== false)
          .map((m) => m.user._id.toString());
        const onlineUserIdsInOrg = orgMemberIds.filter(uid => (userConnections.get(`${uid}_${targetOrgId}`) || 0) > 0);
        
        socket.emit('users:online', {
          onlineUserIds: onlineUserIdsInOrg,
        });
      } catch (err) {
        console.error('Error fetching online user list for organization:', err.message);
      }
    };

    const leaveOrgPresence = (targetOrgId) => {
      if (!targetOrgId) return;
      const connectionKey = `${userId}_${targetOrgId}`;
      const remaining = (userConnections.get(connectionKey) || 1) - 1;
      
      if (remaining <= 0) {
        userConnections.delete(connectionKey);
        
        io.to(`company:${targetOrgId}`).emit('user:offline', { 
           userId, 
           lastSeenAt: socket.user.settings?.privacy?.lastSeen === false ? null : new Date() 
        });
      } else {
        userConnections.set(connectionKey, remaining);
      }
    };

    if (orgId) {
      await joinOrgPresence(orgId);
    }

    // Company room dynamic switch handler
    socket.on('company:join', async ({ companyId }) => {
      if (companyId) {
        const currentOrg = socket.user.currentOrganization?.toString();
        if (currentOrg === companyId.toString()) return;

        if (currentOrg) {
          leaveOrgPresence(currentOrg);
          Array.from(socket.rooms).forEach((room) => {
            if (room.startsWith('company:')) {
              socket.leave(room);
            }
          });
        }
        
        socket.join(`company:${companyId}`);
        socket.user.currentOrganization = companyId;
        console.log(`Socket ${socket.id} joined company room: company:${companyId}`);
        await joinOrgPresence(companyId);
      }
    });

    // Sync pending undelivered direct messages on connection
    try {
      Message.find({
        receiver: userId,
        isDelivered: false,
        deleted: false,
      })
        .select('_id conversationId sender')
        .limit(200)
        .then((undelivered) => {
          if (undelivered && undelivered.length > 0) {
            socket.emit('message:pending_delivery', {
              messageIds: undelivered.map((m) => m._id),
            });
          }
        })
        .catch((err) => console.error('Error fetching undelivered messages:', err.message));
    } catch (err) {
      console.error('Error in undelivered lookup:', err.message);
    }

    // Message Delivery Acknowledgement
    socket.on('message:ack_delivery', async (data) => {
      try {
        const messageIds = Array.isArray(data?.messageIds) ? data.messageIds : (data?.messageId ? [data.messageId] : []);
        if (messageIds.length === 0) return;
        const validIds = messageIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length === 0) return;

        const messages = await Message.find({ _id: { $in: validIds } });
        const accessible = messages.filter((m) => {
          const senderId = (m.sender?._id || m.sender?.id || m.sender)?.toString();
          if (senderId === userId) return false;
          if (m.conversationId && m.receiver) {
            return m.receiver.toString() === userId;
          }
          if (m.channelId) return true;
          return false;
        });

        if (accessible.length === 0) return;

        const deliveredAt = new Date();
        const accessibleIds = accessible.map((m) => m._id);

        await Message.updateMany(
          { _id: { $in: accessibleIds } },
          {
            $set: { isDelivered: true },
            $addToSet: { deliveredTo: { userId, deliveredAt } },
          }
        );

        const byScope = new Map();
        accessible.forEach((msg) => {
          const scope = msg.conversationId || msg.channelId;
          const key = `${msg.conversationId ? 'conversation' : 'channel'}:${scope}`;
          if (!byScope.has(key)) byScope.set(key, { message: msg, ids: [] });
          byScope.get(key).ids.push(msg._id);
        });

        for (const { message: msg, ids } of byScope.values()) {
          const room = msg.conversationId ? `conversation:${msg.conversationId}` : `channel:${msg.channelId}`;
          const payload = {
            conversationId: msg.conversationId,
            channelId: msg.channelId,
            messageIds: ids,
            userId,
            deliveredAt,
          };
          io.to(room).emit('message:delivered', payload);
          if (msg.sender) {
            io.to(`user:${msg.sender.toString()}`).emit('message:delivered', payload);
          }
        }
      } catch (err) {
        console.error('[Socket ack_delivery Error]:', err.message);
      }
    });

    // Message Read Acknowledgement
    socket.on('message:ack_read', async (data) => {
      try {
        const messageIds = Array.isArray(data?.messageIds) ? data.messageIds : (data?.messageId ? [data.messageId] : []);
        if (messageIds.length === 0) return;
        const validIds = messageIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
        if (validIds.length === 0) return;

        const messages = await Message.find({ _id: { $in: validIds } });
        const accessible = messages.filter((m) => {
          const senderId = (m.sender?._id || m.sender?.id || m.sender)?.toString();
          return senderId !== userId;
        });
        if (accessible.length === 0) return;

        const readAt = new Date();
        const accessibleIds = accessible.map((m) => m._id);

        await Message.updateMany(
          { _id: { $in: accessibleIds } },
          {
            $set: { isRead: true, isDelivered: true },
            $addToSet: {
              readBy: { userId, readAt },
              deliveredTo: { userId, deliveredAt: readAt },
            },
          }
        );

        const byScope = new Map();
        accessible.forEach((msg) => {
          const scope = msg.conversationId || msg.channelId;
          const key = `${msg.conversationId ? 'conversation' : 'channel'}:${scope}`;
          if (!byScope.has(key)) byScope.set(key, { message: msg, ids: [] });
          byScope.get(key).ids.push(msg._id);
        });

        for (const { message: msg, ids } of byScope.values()) {
          const room = msg.conversationId ? `conversation:${msg.conversationId}` : `channel:${msg.channelId}`;
          const payload = {
            conversationId: msg.conversationId,
            channelId: msg.channelId,
            messageIds: ids,
            userId,
            readAt,
          };
          io.to(room).emit('message:read', payload);
          if (msg.sender) {
            io.to(`user:${msg.sender.toString()}`).emit('message:read', payload);
          }
        }
      } catch (err) {
        console.error('[Socket ack_read Error]:', err.message);
      }
    });

    // 3. Direct Conversation Rooms
    socket.on('conversation:join', async ({ conversationId }) => {
      try {
        if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
          return socket.emit('error', { message: 'Invalid conversationId format' });
        }

        // Authorization check: Verify user is a participant
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          return socket.emit('error', { message: 'Conversation not found' });
        }

        const isParticipant = conversation.participants.some(
          (p) => p.toString() === userId
        );

        if (!isParticipant) {
          return socket.emit('error', {
            message: 'Not authorized to join this conversation room',
          });
        }

        socket.join(`conversation:${conversationId}`);
        console.log(`User ${socket.user.name} joined room: conversation:${conversationId}`);
      } catch (err) {
        console.error('Error joining conversation room:', err.message);
      }
    });

    socket.on('conversation:leave', ({ conversationId }) => {
      if (conversationId) {
        socket.to(`conversation:${conversationId}`).emit('stop_typing', {
          conversationId,
          userId,
        });
        socket.leave(`conversation:${conversationId}`);
        console.log(`User ${socket.user.name} left room: conversation:${conversationId}`);
      }
    });

    // 4. Direct Messaging Typing Events
    socket.on('typing', ({ conversationId }) => {
      if (conversationId) {
        socket.to(`conversation:${conversationId}`).emit('typing', {
          conversationId,
          userId,
          userName: socket.user.name,
        });
      }
    });

    socket.on('stop_typing', ({ conversationId }) => {
      if (conversationId) {
        socket.to(`conversation:${conversationId}`).emit('stop_typing', {
          conversationId,
          userId,
        });
      }
    });

    // 5. Group Channel Rooms
    socket.on('channel:join', async ({ channelId }) => {
      try {
        if (!channelId || !mongoose.Types.ObjectId.isValid(channelId)) {
          return socket.emit('error', { message: 'Invalid channelId format' });
        }

        // Authorization check: Verify user is a channel member
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return socket.emit('error', { message: 'Channel not found' });
        }

        const isMember = channel.members.some((m) => m.toString() === userId);
        if (!isMember) {
          return socket.emit('error', {
            message: 'Not authorized to join this channel room (must be a member)',
          });
        }

        socket.join(`channel:${channelId}`);
        console.log(`User ${socket.user.name} joined room: channel:${channelId}`);
      } catch (err) {
        console.error('Error joining channel room:', err.message);
      }
    });

    socket.on('channel:leave', ({ channelId }) => {
      if (channelId) {
        socket.to(`channel:${channelId}`).emit('channel:stop_typing', {
          channelId,
          userId,
        });
        socket.leave(`channel:${channelId}`);
        console.log(`User ${socket.user.name} left room: channel:${channelId}`);
      }
    });

    // 6. Group Channel Typing Events
    socket.on('channel:typing', async ({ channelId }) => {
      if (channelId) {
        try {
          const Channel = require('../models/Channel');
          const channel = await Channel.findById(channelId).select('isAdminOnly admins createdBy').lean();
          if (channel?.isAdminOnly) {
            const isCreator = channel.createdBy?.toString() === userId;
            const isChannelAdmin = channel.admins?.some(a => a.toString() === userId);
            const isOrgAdmin = ['admin', 'owner', 'super_admin'].includes(socket.user?.role) || ['admin', 'owner', 'super_admin'].includes(socket.user?.globalRole);
            if (!isCreator && !isChannelAdmin && !isOrgAdmin) return;
          }
          socket.to(`channel:${channelId}`).emit('channel:typing', {
            channelId,
            userId,
            userName: socket.user.name,
          });
        } catch (err) {
          console.error('Typing event error:', err.message);
        }
      }
    });

    socket.on('channel:stop_typing', ({ channelId }) => {
      if (channelId) {
        socket.to(`channel:${channelId}`).emit('channel:stop_typing', {
          channelId,
          userId,
        });
      }
    });

    // 7. Disconnecting Handler (fires before rooms are cleared)
    socket.on('disconnecting', () => {
      // Broadcast stop typing to all rooms the user was part of
      socket.rooms.forEach((room) => {
        if (room.startsWith('conversation:')) {
          const conversationId = room.replace('conversation:', '');
          socket.to(room).emit('stop_typing', { conversationId, userId });
        } else if (room.startsWith('channel:')) {
          const channelId = room.replace('channel:', '');
          socket.to(room).emit('channel:stop_typing', { channelId, userId });
        }
      });
    });

    // 7. Disconnect Handler
    socket.on('disconnect', async () => {
      console.log(`[Socket Disconnected] User: ${socket.user.name} (${userId}) | Socket ID: ${socket.id}`);

      const currentOrgId = socket.user.currentOrganization?.toString();
      if (currentOrgId) {
        leaveOrgPresence(currentOrgId);
      }

      // Check if user has NO connections across ANY orgs before updating DB
      try {
        const sockets = await io.in(`user:${userId}`).fetchSockets();
        if (sockets.length === 0) {
          User.updateOne({ _id: userId }, { $set: { lastSeenAt: new Date() } }).catch((error) => {
            console.error('Last-seen update error:', error.message);
          });
          
          // Cleanup active calls for this user
          for (const [sessionKey, session] of activeCalls.entries()) {
            if (session.callerId === userId || session.receiverId === userId) {
              const otherUserId = session.callerId === userId ? session.receiverId : session.callerId;
              activeCalls.delete(sessionKey);
              
              recordCallMessage({
                callerId: session.callerId,
                receiverId: session.receiverId,
                callType: session.callType,
                status: session.connected ? 'completed' : 'missed',
                duration: session.connectedAt ? Math.floor((Date.now() - session.connectedAt) / 1000) : 0,
                conversationId: session.conversationId,
                orgId: session.orgId,
              });

              io.to(`user:${otherUserId}`).emit('call:ended', {
                senderId: userId,
              });
            }
          }

          // Cleanup active LiveKit calls for this user
          for (const [roomId, session] of activeLiveKitCalls.entries()) {
            if (session.users && session.users.has(userId)) {
              session.users.delete(userId);
              if (session.users.size === 0) {
                activeLiveKitCalls.delete(roomId);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching sockets on disconnect:', err.message);
      }
    });

    // 8. WebRTC Calling Signaling
    socket.on('call:request', (data) => {
      if (data.receiverId) {
        const sessionKey = `${userId}_${data.receiverId}`;
        activeCalls.set(sessionKey, {
          callerId: userId,
          receiverId: data.receiverId,
          callType: data.callType || 'audio',
          conversationId: data.conversationId,
          startTime: Date.now(),
          connected: false,
          connectedAt: null,
          orgId: socket.user.currentOrganization?.toString(),
        });

        io.to(`user:${data.receiverId}`).emit('call:incoming', {
          callerId: userId,
          callerName: socket.user.name,
          callerAvatar: socket.user.avatar,
          callType: data.callType,
          conversationId: data.conversationId,
        });

        try {
          const { sendPushToUser } = require('./pushNotificationService');
          const callTypeLabel = (data.callType === 'video') ? 'Video' : 'Audio';
          sendPushToUser(data.receiverId, {
            title: `Incoming ${callTypeLabel} Call`,
            body: `From ${socket.user.name}`,
            data: {
              type: 'call',
              callType: data.callType === 'video' ? 'video' : 'audio',
              callerId: String(userId),
              callerName: String(socket.user.name || 'Caller'),
              callerAvatar: String(socket.user.avatar || ''),
              roomId: String(data.roomId || `call_${userId}_${data.receiverId}`),
              conversationId: String(data.conversationId || ''),
            }
          }).catch(err => console.error('[CALL PUSH ERROR]', err.message));
        } catch (pushErr) {
          console.error('[CALL PUSH ERROR]', pushErr.message);
        }
      }
    });

    socket.on('call:accept', (data) => {
      if (data.callerId) {
        const sessionKey = `${data.callerId}_${userId}`;
        const session = activeCalls.get(sessionKey);
        if (session) {
          session.connected = true;
          session.connectedAt = Date.now();
        }
        io.to(`user:${data.callerId}`).emit('call:accepted', {
          receiverId: userId,
        });
      }
    });

    socket.on('call:reject', (data) => {
      if (data.callerId) {
        const sessionKey = `${data.callerId}_${userId}`;
        const session = activeCalls.get(sessionKey);
        if (session) {
          activeCalls.delete(sessionKey);
        }

        recordCallMessage({
          callerId: data.callerId,
          receiverId: userId,
          callType: session?.callType || data.callType || 'audio',
          status: 'declined',
          duration: 0,
          conversationId: session?.conversationId || data.conversationId,
          orgId: socket.user.currentOrganization?.toString(),
        });

        io.to(`user:${data.callerId}`).emit('call:rejected', {
          receiverId: userId,
        });
      }
    });

    socket.on('call:offer', (data) => {
      if (data.targetId) {
        io.to(`user:${data.targetId}`).emit('call:offer', {
          senderId: userId,
          offer: data.offer,
        });
      }
    });

    socket.on('call:answer', (data) => {
      if (data.targetId) {
        io.to(`user:${data.targetId}`).emit('call:answer', {
          senderId: userId,
          answer: data.answer,
        });
      }
    });

    socket.on('call:ice-candidate', (data) => {
      if (data.targetId) {
        io.to(`user:${data.targetId}`).emit('call:ice-candidate', {
          senderId: userId,
          candidate: data.candidate,
        });
      }
    });

    socket.on('call:end', (data) => {
      if (data.targetId) {
        const key1 = `${userId}_${data.targetId}`;
        const key2 = `${data.targetId}_${userId}`;
        const session = activeCalls.get(key1) || activeCalls.get(key2);

        if (session) {
          activeCalls.delete(key1);
          activeCalls.delete(key2);
        }

        const callerId = session?.callerId || (data.isCaller ? userId : data.targetId);
        const receiverId = session?.receiverId || (data.isCaller ? data.targetId : userId);
        const callType = session?.callType || data.callType || 'audio';
        const conversationId = session?.conversationId || data.conversationId;

        let status = 'ended';
        let duration = 0;

        if (session && session.connected && session.connectedAt) {
          status = 'ended';
          duration = Math.max(1, Math.round((Date.now() - session.connectedAt) / 1000));
        } else if (data.duration && data.duration > 0) {
          status = 'ended';
          duration = data.duration;
        } else if (session && !session.connected) {
          status = userId === session.callerId ? 'cancelled' : 'missed';
          duration = 0;
        } else {
          status = data.status || 'ended';
          duration = data.duration || 0;
        }

        recordCallMessage({
          callerId,
          receiverId,
          callType,
          status,
          duration,
          conversationId,
          orgId: socket.user.currentOrganization?.toString(),
        });

        io.to(`user:${data.targetId}`).emit('call:ended', {
          senderId: userId,
        });
      }
    });

    // 9. LiveKit Invitation Signaling
    socket.on('livekit:invite', async (data) => {
      // data: { inviteeId, roomId, contextName, channelId, conversationId }
      if (data.inviteeId) {
        try {
          // Emit to invitee
          io.to(`user:${data.inviteeId}`).emit('livekit:incoming_invite', {
            inviterId: userId,
            inviterName: socket.user.name,
            inviterAvatar: socket.user.avatar,
            roomId: data.roomId,
            contextName: data.contextName,
            channelId: data.channelId,
            conversationId: data.conversationId,
          });

          try {
            const { sendPushToUser } = require('./pushNotificationService');
            const callTypeLabel = data.audioOnly ? 'Audio' : 'Video';
            await sendPushToUser(data.inviteeId, {
              title: `Incoming ${callTypeLabel} Call`,
              body: `From ${socket.user.name}`,
              data: {
                type: 'call',
                callType: data.audioOnly ? 'audio' : 'video',
                callerId: String(userId),
                callerName: String(socket.user.name || 'Caller'),
                callerAvatar: String(socket.user.avatar || ''),
                roomId: String(data.roomId || ''),
                conversationId: String(data.conversationId || ''),
                channelId: String(data.channelId || ''),
              }
            });
            console.log(`[CALL PUSH] Dispatched LiveKit video call push to user ${data.inviteeId}`);
          } catch (pushErr) {
            console.error('[CALL PUSH ERROR]', pushErr.message);
          }
        } catch (err) {
          console.error('Error saving LiveKit invitation:', err.message);
        }
      }
    });

    socket.on('livekit:accept', async (data) => {
      // data: { inviterId, roomId }
      if (data.roomId) {
        try {
          // Future: log acceptance

        } catch (err) {
          console.error('Error accepting LiveKit invitation:', err.message);
        }
      }
    });

    socket.on('livekit:decline', async (data) => {
      // data: { inviterId, roomId }
      if (data.roomId) {
        try {
          // Future: log decline

          if (data.inviterId) {
            io.to(`user:${data.inviterId}`).emit('livekit:declined', {
              inviteeId: userId,
              inviteeName: socket.user.name,
              roomId: data.roomId
            });
          }
        } catch (err) {
          console.error('Error declining LiveKit invitation:', err.message);
        }
      }
    });
    socket.on('livekit:start_channel_call', async (data, callback) => {
      if (data.channelId) {
        // Enforce authoritative call type for active session
        if (!activeLiveKitCalls.has(data.roomId)) {
          activeLiveKitCalls.set(data.roomId, {
            callType: !!data.audioOnly,
            channelId: data.channelId,
            conversationId: null,
            users: new Set(),
          });
        }
        const session = activeLiveKitCalls.get(data.roomId);
        session.users.add(userId);
        data.audioOnly = session.callType;

        if (typeof callback === 'function') {
          callback({ audioOnly: data.audioOnly });
        }

        const Channel = require('../models/Channel');
        const Message = require('../models/Message');
        const { sendPushToUser } = require('./pushNotificationService');
        try {
          const channel = await Channel.findById(data.channelId);
          if (channel) {
            const callTypeLabel = data.audioOnly ? 'Audio' : 'Video';
            // Emit incoming invite & push notification to all channel members except caller
            channel.members.forEach(memberId => {
              const memIdStr = memberId.toString();
              if (memIdStr !== userId) {
                io.to(`user:${memIdStr}`).emit('livekit:incoming_invite', {
                  inviterId: userId,
                  inviterName: socket.user.name,
                  inviterAvatar: socket.user.avatar,
                  roomId: data.roomId,
                  contextName: data.contextName || channel.name,
                  channelId: data.channelId,
                  audioOnly: data.audioOnly,
                });

                sendPushToUser(memIdStr, {
                  title: `Incoming ${callTypeLabel} Call in #${channel.name}`,
                  body: `From ${socket.user.name}`,
                  data: {
                    type: 'call',
                    callType: data.audioOnly ? 'audio' : 'video',
                    callerId: String(userId),
                    callerName: String(socket.user.name || 'Caller'),
                    callerAvatar: String(socket.user.avatar || ''),
                    roomId: String(data.roomId || ''),
                    channelId: String(data.channelId || ''),
                    channelName: String(channel.name || ''),
                  }
                }).catch(err => console.error('[CHANNEL CALL PUSH ERROR]', err.message));
              }
            });

            // Log the group call as a system message in the channel
            const newMessage = await Message.create({
              organization: socket.user.currentOrganization,
              channelId: channel._id,
              sender: userId,
              messageType: 'call',
              call: {
                callType: data.audioOnly ? 'audio' : 'video',
                status: 'started',
                duration: 0
              }
            });

            await newMessage.populate('sender', 'name avatar email');
            io.to(`channel:${channel._id}`).emit('channel:message:new', { message: newMessage });
          }
        } catch (err) {
          console.error('Error starting channel call:', err.message);
        }
      }
    });

    socket.on('livekit:start_group_call', async (data, callback) => {
      // data: { conversationId, roomId, contextName, audioOnly }
      if (data.conversationId) {
        // Enforce authoritative call type for active session
        if (!activeLiveKitCalls.has(data.roomId)) {
          activeLiveKitCalls.set(data.roomId, {
            callType: !!data.audioOnly,
            channelId: null,
            conversationId: data.conversationId,
            users: new Set(),
          });
        }
        const session = activeLiveKitCalls.get(data.roomId);
        session.users.add(userId);
        data.audioOnly = session.callType;

        if (typeof callback === 'function') {
          callback({ audioOnly: data.audioOnly });
        }

        const Conversation = require('../models/Conversation');
        const { sendPushToUser } = require('./pushNotificationService');
        try {
          const conversation = await Conversation.findById(data.conversationId);
          if (conversation && conversation.participants) {
            const callTypeLabel = data.audioOnly ? 'Audio' : 'Video';
            conversation.participants.forEach(memberId => {
              const memIdStr = memberId.toString();
              if (memIdStr !== userId) {
                io.to(`user:${memIdStr}`).emit('livekit:incoming_invite', {
                  inviterId: userId,
                  inviterName: socket.user.name,
                  inviterAvatar: socket.user.avatar,
                  roomId: data.roomId,
                  contextName: data.contextName || conversation.name,
                  conversationId: data.conversationId,
                  audioOnly: data.audioOnly,
                });

                sendPushToUser(memIdStr, {
                  title: `Incoming ${callTypeLabel} Call`,
                  body: `From ${socket.user.name}`,
                  data: {
                    type: 'call',
                    callType: data.audioOnly ? 'audio' : 'video',
                    callerId: String(userId),
                    callerName: String(socket.user.name || 'Caller'),
                    callerAvatar: String(socket.user.avatar || ''),
                    roomId: String(data.roomId || ''),
                    conversationId: String(data.conversationId || ''),
                    isGroup: 'true',
                  }
                }).catch(err => console.error('[GROUP CALL PUSH ERROR]', err.message));
              }
            });
          }
        } catch (err) {
          console.error('Error starting group call:', err.message);
        }
      }
    });

    socket.on('livekit:leave_call', (data) => {
      if (data.roomId && activeLiveKitCalls.has(data.roomId)) {
        const session = activeLiveKitCalls.get(data.roomId);
        if (session.users) {
          session.users.delete(userId);
          if (session.users.size === 0) {
            activeLiveKitCalls.delete(data.roomId);
            if (session.channelId) {
              io.emit('channel:call:ended', { channelId: session.channelId, roomId: data.roomId });
            }
          }
        }
      }
    });
  });
};

/**
 * Get active Socket.IO server instance
 */
const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO has not been initialized');
  }
  return ioInstance;
};

/**
 * Get list of currently online user IDs
 */
const getOnlineUserIds = () => {
  return Array.from(userConnections.keys());
};

module.exports = {
  initSocket,
  getIO,
  getOnlineUserIds,
};
