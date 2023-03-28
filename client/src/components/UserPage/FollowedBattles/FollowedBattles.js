import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWED_BATTLES } from './gql';
import BattleLink from '../../SharedComponents/BattleLink/BattleLink';
import ContentStyleWrapper from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { FollowedBattlesContainer } from '../FollowedBattles/FollowedBattles.styles';
import { BATTLES_TO_RETRIEVE, BACKGROUND_CONTAINER_WIDTH } from '../Constants';
import UserPageHeadline from '../../SharedComponents/UserPageHeadlines/UserPageHeadline';

function FollowedBattles() {
  const { loading, data, error } = useQuery(GET_FOLLOWED_BATTLES, {
    variables: {
      userId: 1,
      battleCount: BATTLES_TO_RETRIEVE,
      dateRange: 'Weekly',
    },
  });

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [data]);

  if (loading) return 'Loading...';
  return (
    <>
      <UserPageHeadline displayText={'BATTLERS YOU FOLLOW'}></UserPageHeadline>
      <ContentStyleWrapper width={BACKGROUND_CONTAINER_WIDTH}>
        <FollowedBattlesContainer>
          <div className='followed-battles-container'>
            {data?.followedBattles?.length > 0 ? (
              data.followedBattles.map((battle) => (
                <BattleLink key={battle.id} battle={battle} />
              ))
            ) : (
              <div>
                None of the battlers you follow have battles in the last week
              </div>
            )}
          </div>
        </FollowedBattlesContainer>
      </ContentStyleWrapper>
    </>
  );
}

export default FollowedBattles;
