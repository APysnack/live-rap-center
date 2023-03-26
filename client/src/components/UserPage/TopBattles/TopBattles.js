import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOP_BATTLES } from './gql';
import BattleLink from '../../SharedComponents/BattleLink/BattleLink';
import ContentStyleWrapper from '../../SharedComponents/ContentContainer/ContentStyleWrapper';

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
    <ContentStyleWrapper>
      <div>Top Battles this week</div>
      {data?.topBattles?.length > 0 ? (
        data.topBattles.map((battle) => (
          <BattleLink key={battle.id} battle={battle} />
        ))
      ) : (
        <div>No battles that have finished voting in the last week</div>
      )}
    </ContentStyleWrapper>
  );
}

export default TopBattles;
