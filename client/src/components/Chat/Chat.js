import React from 'react';
import ChatForm from '../SharedComponents/ChatForm/ChatForm';
import useChat from './UseChat';
import { useLocation } from 'react-router-dom';
import AddMemberBar from './AddMemberBar/AddMemberBar';
import ChatSwitcher from './ChatSwitcher/ChatSwitcher';
import { ChatContentsContainer } from './Chat.styles';
import MembersList from './MembersList/MembersList';

function Chat() {
  const location = useLocation();
  const isCrewChat = location?.state?.crewId;

  const chatOwnerId = isCrewChat
    ? location?.state?.crewId
    : location?.state?.leagueId;

  const chatTitle = isCrewChat
    ? location?.state?.crewName
    : location?.state?.leagueName;

  const { messages, title, sendMessage } = useChat(
    isCrewChat ? 'crew' : 'league',
    chatOwnerId,
    chatTitle,
    location
  );

  return (
    <ChatContentsContainer>
      <div>
        <ChatSwitcher
          chatTitle={chatTitle}
          chatOwnerId={chatOwnerId}
          isCrewChat={isCrewChat}
        />
      </div>

      <ChatForm messages={messages} title={title()} onSubmit={sendMessage} />

      <div className='members-list-container'>
        {isCrewChat && <AddMemberBar crewId={location.state.crewId} />}
        <MembersList
          chatOwnerId={chatOwnerId}
          isCrewChat={isCrewChat}
          location={location}
        />
      </div>
    </ChatContentsContainer>
  );
}

export default Chat;
