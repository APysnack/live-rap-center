import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWED_BATTLES } from './gql';
import BattleLink from '../../SharedComponents/BattleLink/BattleLink';
import ContentStyleWrapper from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { FollowedBattlesContainer } from '../FollowedBattles/FollowedBattles.styles';

const BATTLES_TO_RETRIEVE = 5;

function FollowedBattles({ userId }) {
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
    <ContentStyleWrapper width={1000}>
      <FollowedBattlesContainer>
        <div>Battlers You Follow</div>
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
  );
}

export default FollowedBattles;
