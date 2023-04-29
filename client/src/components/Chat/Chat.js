import React from 'react';
import ChatForm from '../SharedComponents/ChatForm/ChatForm';
import useChat from './UseChat';
import { useLocation } from 'react-router-dom';
import AddMemberBar from './AddMemberBar/AddMemberBar';

function Chat({ cable }) {
  const location = useLocation();
  const { messages, title, sendMessage } = useChat(
    cable,
    location?.state?.crewId ? 'crew' : 'league',
    location?.state?.crewId || location?.state?.leagueId,
    location?.state?.crewName || location?.state?.leagueName
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {location?.state?.crewId && (
        <AddMemberBar crewId={location.state.crewId} />
      )}
      <ChatForm messages={messages} title={title()} onSubmit={sendMessage} />
    </div>
  );
}

export default Chat;
