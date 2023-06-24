import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER } from '../gql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ChatLinkContainer } from '../Chat.styles';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { v4 as uuidv4 } from 'uuid';

function ChatSwitcher({ chatOwnerId, chatTitle, isCrewChat }) {
  const { user } = useSelector((state) => state.user.userState);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChat, setActiveChat] = useState({
    chatOwnerId,
    chatTitle,
    isCrewChat,
  });

  useEffect(() => {
    console.log(activeChat);
  }, [isCrewChat]);

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

  const {
    loading,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    skip: user?.id ? false : true,
    variables: { id: user?.id },
  });

  useEffect(() => {
    setActiveChat({ chatOwnerId, chatTitle, isCrewChat });
  }, [chatOwnerId, chatTitle, isCrewChat]);

  useEffect(() => {
    if (userData?.user) {
      setCurrentUser(userData.user);
    }
  }, [userData]);

  if (loading) return 'Loading...';

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
