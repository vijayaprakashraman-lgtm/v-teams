import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

const LiveKitContext = createContext();

export const useLiveKit = () => useContext(LiveKitContext);

export const LiveKitProvider = ({ children }) => {
  const [liveKitToken, setLiveKitToken] = useState(null);
  const [liveKitRoomName, setLiveKitRoomName] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const startCall = async ({ roomName, participantName, conversationId, channelId }) => {
    try {
      const { data } = await api.post('/livekit/token', {
        roomName,
        participantName,
        conversationId,
        channelId
      });
      if (data.success && data.token) {
        setLiveKitToken(data.token);
        setLiveKitRoomName(roomName);
        setIsCalling(true);
      }
    } catch (error) {
      console.error('Error starting LiveKit call:', error);
      alert('Could not start video call. Please try again.');
    }
  };

  const joinCall = startCall;

  const endCall = () => {
    setLiveKitToken(null);
    setLiveKitRoomName(null);
    setIsCalling(false);
  };

  return (
    <LiveKitContext.Provider value={{ liveKitToken, liveKitRoomName, isCalling, startCall, joinCall, endCall }}>
      {children}
    </LiveKitContext.Provider>
  );
};
