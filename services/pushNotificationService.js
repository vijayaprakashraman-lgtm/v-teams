const { isInitialized } = require('../config/firebaseAdmin');
const { getMessaging } = require('firebase-admin/messaging');
const User = require('../models/User');

/**
 * Sends a high-priority push notification to a specific user's FCM tokens
 * Ensures reliable wake-up on Android devices in background/closed states
 * 
 * @param {string} userId - The MongoDB User ID
 * @param {Object} payload - The notification payload ({ title, body, data })
 */
const sendPushToUser = async (userId, payload) => {
  if (!isInitialized) return { success: false, error: 'Firebase Admin not initialized' };

  try {
    const user = await User.findById(userId).select('fcmTokens');
    if (!user || !user.fcmTokens || user.fcmTokens.length === 0) {
      return { success: false, error: 'No FCM tokens found for user' };
    }

    const type = payload.data?.type?.toString().toLowerCase() || '';
    const isCall = type === 'call' ||
                   type === 'incoming_call' ||
                   type === 'audio_call' ||
                   type === 'video_call' ||
                   payload.data?.callType ||
                   payload.data?.roomId;

    const channelId = isCall ? 'v_chat_calls_v2' : 'v_chat_messages_v2';

    const stringData = {};
    if (payload.data && Object.keys(payload.data).length > 0) {
      for (const [key, val] of Object.entries(payload.data)) {
        stringData[key] = val != null ? String(val) : '';
      }
    }
    if (payload.title && !stringData.title) stringData.title = String(payload.title);
    if (payload.body && !stringData.body) stringData.body = String(payload.body);

    const message = {
      tokens: user.fcmTokens,
      data: stringData,
      android: {
        priority: 'high',
        ttl: isCall ? 45 * 1000 : 24 * 60 * 60 * 1000,
        notification: {
          channelId: channelId,
          priority: 'max',
          defaultSound: true,
          defaultVibrateTimings: true,
          visibility: 'public',
        },
      },
      apns: {
        headers: {
          'apns-priority': '10',
          'apns-push-type': isCall ? 'voip' : 'alert',
        },
        payload: {
          aps: {
            sound: 'default',
            contentAvailable: true,
          },
        },
      },
    };

    if (payload.title || payload.body) {
      message.notification = {
        title: payload.title || 'New Notification',
        body: payload.body || '',
      };
      message.android.notification.title = payload.title || 'New Notification';
      message.android.notification.body = payload.body || '';
    }

    const response = await getMessaging().sendEachForMulticast(message);
    
    // Check for failed tokens to clean up
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const errorCode = resp.error?.code;
          if (
            errorCode === 'messaging/invalid-registration-token' ||
            errorCode === 'messaging/registration-token-not-registered'
          ) {
            failedTokens.push(user.fcmTokens[idx]);
          }
        }
      });

      if (failedTokens.length > 0) {
        await User.findByIdAndUpdate(userId, {
          $pullAll: { fcmTokens: failedTokens },
        });
        console.log(`[FCM] Cleaned up ${failedTokens.length} invalid tokens for user ${userId}`);
      }
    }

    return { success: true, successCount: response.successCount, failureCount: response.failureCount };
  } catch (error) {
    console.error('[FCM] Push Notification Error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPushToUser,
};
