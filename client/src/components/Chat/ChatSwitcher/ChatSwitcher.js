import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER } from '../gql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ChatLinkContainer } from '../Chat.styles';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';

function ChatSwitcher() {
  const { user } = useSelector((state) => state.user.userState);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    loading,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    skip: user?.id ? false : true,
    variables: { id: user?.id },
  });

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
          ) : null}
          {currentUser.crews.map((crew) => (
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
          ))}
        </ChatLinkContainer>
      ) : (
        'bar'
      )}
    </ContentContainer>
  );
}

export default ChatSwitcher;
