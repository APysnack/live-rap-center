import React, { useEffect, useState } from 'react';
import ChatForm from '../SharedComponents/ChatForm/ChatForm';
import useChat from './UseChat';
import { useLocation } from 'react-router-dom';
import AddMemberBar from './AddMemberBar/AddMemberBar';
import ChatSwitcher from './ChatSwitcher/ChatSwitcher';
import { ChatContentsContainer } from './Chat.styles';
import MembersList from './MembersList/MembersList';
import useViewType from '../../utils/useViewType';
import { useSwipeable } from 'react-swipeable';
import { useSelector } from 'react-redux';
import { GET_USER } from './gql';
import { useQuery } from '@apollo/client';

const mobileViews = ['switcher', 'chat', 'members'];

function Chat() {
  const location = useLocation();
  const viewType = useViewType();

  const { user } = useSelector((state) => state.user.userState);
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileView, setMobileView] = useState(mobileViews[1]);

  const [isCrewChat, setIsCrewChat] = useState(null);
  const [chatOwnerId, setChatOwnerId] = useState(null);
  const [chatTitle, setChatTitle] = useState(null);

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

  useEffect(() => {
    if (location.state === null) {
      if (currentUser?.battler?.league) {
        setIsCrewChat(false);
        setChatOwnerId(currentUser.battler.league.id);
        setChatTitle(currentUser.battler.league.leagueName);
      } else if (currentUser?.crews?.length > 0) {
        setIsCrewChat(true);
        setChatOwnerId(currentUser.crews[0].id);
        setChatTitle(currentUser.crews[0].name);
      }
    } else {
      if (location?.state?.crewId !== undefined) {
        setIsCrewChat(true);
        setChatOwnerId(location?.state?.crewId);
        setChatTitle(location?.state?.crewName);
      } else {
        setIsCrewChat(false);
        setChatOwnerId(location?.state?.leagueId);
        setChatTitle(location?.state?.leagueName);
      }
    }
  }, [location, currentUser]);

  const { messages, title, sendMessage } = useChat(
    isCrewChat ? 'crew' : 'league',
    chatOwnerId,
    chatTitle,
    location
  );

  const handleSwipeLeft = () => {
    if (mobileView === mobileViews[0]) {
      setMobileView(mobileViews[1]);
    } else if (mobileView === mobileViews[1]) {
      setMobileView(mobileViews[2]);
    }
  };

  const handleSwipeRight = () => {
    if (mobileView === mobileViews[1]) {
      setMobileView(mobileViews[0]);
    } else if (mobileView === mobileViews[2]) {
      setMobileView(mobileViews[1]);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  if (loading) return 'Loading...';

  return (
    <div {...swipeHandlers}>
      <ChatContentsContainer>
        {viewType !== 'mobile' || mobileView === 'switcher' ? (
          <ChatSwitcher
            user={user}
            currentUser={currentUser}
            chatTitle={chatTitle}
            chatOwnerId={chatOwnerId}
            isCrewChat={isCrewChat}
          />
        ) : null}

        {viewType !== 'mobile' || mobileView === 'chat' ? (
          <ChatForm
            messages={messages}
            title={title()}
            onSubmit={sendMessage}
          />
        ) : null}

        {viewType !== 'mobile' || mobileView === 'members' ? (
          <div className='members-list-container'>
            {isCrewChat ? <AddMemberBar crewId={chatOwnerId} /> : null}
            <MembersList
              chatOwnerId={chatOwnerId}
              isCrewChat={isCrewChat}
              location={location}
            />
          </div>
        ) : null}
      </ChatContentsContainer>
    </div>
  );
}

export default Chat;
