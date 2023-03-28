import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOP_BATTLES } from './gql';
import BattleLink from '../../SharedComponents/BattleLink/BattleLink';
import ContentStyleWrapper from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { TopBattlesContainer } from './TopBattles.styles';
import { BATTLES_TO_RETRIEVE, BACKGROUND_CONTAINER_WIDTH } from '../Constants';
import UserPageHeadline from '../../SharedComponents/UserPageHeadlines/UserPageHeadline';

function TopBattles() {
  const { loading, data, error } = useQuery(GET_TOP_BATTLES, {
    variables: { battleCount: BATTLES_TO_RETRIEVE, dateRange: 'Weekly' },
  });

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [data]);

  if (loading) return 'Loading...';
  return (
    <>
      <UserPageHeadline
        displayText={'TOP BATTLES THIS WEEK'}
      ></UserPageHeadline>
      <ContentStyleWrapper width={BACKGROUND_CONTAINER_WIDTH}>
        <TopBattlesContainer>
          <div className='top-battles-container'>
            {data?.topBattles?.length > 0 ? (
              data.topBattles.map((battle) => (
                <BattleLink key={battle.id} battle={battle} />
              ))
            ) : (
              <div>No battles that have finished voting in the last week</div>
            )}
          </div>
        </TopBattlesContainer>
      </ContentStyleWrapper>
    </>
  );
}

export default TopBattles;
