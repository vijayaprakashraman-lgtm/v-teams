import React from 'react';
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';
import '../../styles/livekit.css';
import { useLiveKit } from '../../context/LiveKitContext';

function LiveKitCallOverlay() {
  const { liveKitToken, isCalling, endCall } = useLiveKit();
  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';

  if (!isCalling || !liveKitToken) return null;

  return (
    <div className="livekit-overlay">
      <LiveKitRoom
        video={true}
        audio={true}
        token={liveKitToken}
        serverUrl={liveKitUrl}
        onDisconnected={endCall}
        data-lk-theme="default"
        style={{ height: '100dvh' }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

export default LiveKitCallOverlay;
