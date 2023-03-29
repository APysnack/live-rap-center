import React, { useState, useEffect } from 'react';
import ContentStyleWrapper from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import LeagueInvitations from './LeagueInvitations';
import CrewInvitations from './CrewInvitations';
import { NotificationsContainer } from './UserPage.styles';
import FlexContainer from '../SharedComponents/FlexContainer/FlexContainer';
import ChatDropDown from './ChatDropDown/ChatDropDown';

function NewsContainer({
  currentUser,
  battler,
  refetchBattler,
  refetchUser,
  cable,
}) {
  const [potentialLeagues, setPotentialLeagues] = useState();
  const [potentialCrews, setPotentialCrews] = useState();

  useEffect(() => {
    if (battler?.potentialLeagues) {
      setPotentialLeagues(battler.potentialLeagues);
    }
  }, [battler]);

  useEffect(() => {
    if (currentUser?.potentialCrews) {
      setPotentialCrews(currentUser.potentialCrews);
    }
  }, [currentUser]);

  return (
    <ContentStyleWrapper width={'45vw'}>
      <NotificationsContainer>
        <FlexContainer gap={'2em'}>
          {potentialLeagues?.length > 0 ? (
            <LeagueInvitations
              battler={battler}
              potentialLeagues={potentialLeagues}
              setPotentialLeagues={setPotentialLeagues}
              refetchBattler={refetchBattler}
            />
          ) : null}
          <CrewInvitations
            user={currentUser}
            potentialCrews={potentialCrews}
            setPotentialCrews={setPotentialCrews}
            refetchUser={refetchUser}
          />
          <ChatDropDown currentUser={currentUser} cable={cable} />
        </FlexContainer>
      </NotificationsContainer>
    </ContentStyleWrapper>
  );
}

export default NewsContainer;
