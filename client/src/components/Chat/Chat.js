import React, { useState } from 'react';
import ChatForm from '../SharedComponents/ChatForm/ChatForm';
import useChat from './UseChat';
import { useLocation } from 'react-router-dom';
import AddMemberBar from './AddMemberBar/AddMemberBar';
import ChatSwitcher from './ChatSwitcher/ChatSwitcher';
import { ChatContentsContainer } from './Chat.styles';
import MembersList from './MembersList/MembersList';
import useViewType from '../../utils/useViewType';
import { useSwipeable } from 'react-swipeable';

const mobileViews = ['switcher', 'chat', 'members'];

function Chat() {
  const location = useLocation();
  const viewType = useViewType();
  const [mobileView, setMobileView] = useState(mobileViews[1]);
  const isCrewChat = location?.state?.crewId !== undefined;

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

  return (
    <div {...swipeHandlers}>
      <ChatContentsContainer>
        {viewType !== 'mobile' || mobileView === 'switcher' ? (
          <ChatSwitcher
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
            {isCrewChat && <AddMemberBar crewId={location.state.crewId} />}
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
