import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOP_BATTLES } from './gql';
import BattleLink from '../../SharedComponents/BattleLink/BattleLink';
import ContentStyleWrapper from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { TopBattlesContainer } from './TopBattles.styles';

function TopBattles() {
  const { loading, data, error } = useQuery(GET_TOP_BATTLES, {
    variables: { battleCount: 5, dateRange: 'Weekly' },
  });

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [data]);

  if (loading) return 'Loading...';
  return (
    <>
      <div>Top Battles this week</div>
      <ContentStyleWrapper width={1800}>
        <TopBattlesContainer>
          <div>
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
