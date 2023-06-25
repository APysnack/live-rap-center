import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { ChatLinkContainer } from '../Chat.styles';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { v4 as uuidv4 } from 'uuid';

function ChatSwitcher({ currentUser, chatOwnerId, chatTitle, isCrewChat }) {
  const [activeChat, setActiveChat] = useState({
    chatOwnerId,
    chatTitle,
    isCrewChat,
  });

  const isActiveLink = (chatId, chatName) => {
    if (
      activeChat.chatOwnerId === chatId &&
      chatName === activeChat.chatTitle
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (chatOwnerId) {
      setActiveChat({ chatOwnerId, chatTitle, isCrewChat });
    }
  }, [chatOwnerId, chatTitle, isCrewChat]);

  return (
    <ContentContainer height={'80vh'} width={'17vw'}>
      {currentUser?.crews?.length > 0 ? (
        <ChatLinkContainer>
          {currentUser?.battler?.league ? (
            activeChat.isCrewChat ? (
              <Link
                className='chat-link'
                to='/chat'
                state={{
                  leagueId: currentUser.battler.league.id,
                  leagueName: currentUser.battler.league.leagueName,
                  type: 'league',
                }}
              >
                {currentUser.battler.league.leagueName.toUpperCase()}
              </Link>
            ) : (
              <div key={uuidv4()} className='chat-link active-chat'>
                {currentUser.battler.league.leagueName.toUpperCase()}
              </div>
            )
          ) : null}
          {currentUser.crews.map((crew) =>
            isActiveLink(crew.crewChatId, crew.name) ? (
              <div key={crew.crewChatId} className='chat-link active-chat'>
                {crew.name.toUpperCase()}
              </div>
            ) : (
              <Link
                className='chat-link'
                key={crew.crewChatId}
                to='/chat'
                state={{
                  crewId: crew.crewChatId,
                  crewName: crew.name,
                }}
              >
                {crew.name.toUpperCase()}
              </Link>
            )
          )}
        </ChatLinkContainer>
      ) : (
        'bar'
      )}
    </ContentContainer>
  );
}

export default ChatSwitcher;
