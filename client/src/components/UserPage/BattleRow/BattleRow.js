import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWED_BATTLES, GET_TOP_BATTLES } from './gql';
import BattleLink from '../../SharedComponents/BattleLink/BattleLink';
import ContentStyleWrapper from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { BATTLES_TO_RETRIEVE, BACKGROUND_CONTAINER_WIDTH } from '../Constants';
import UserPageHeadline from '../../SharedComponents/UserPageHeadlines/UserPageHeadline';
import { BattleRowContainer } from './BattleRow.styles';
import useViewType from '../../../utils/useViewType';
import Loading from '../../SharedComponents/Loading/Loading';

function BattleRow({ type = 'topBattles', userId = null }) {
  const viewType = useViewType();

  const [battlesToRetrieveCount, setBattlesToRetreiveCount] = useState(4);

  useEffect(() => {
    if (viewType === 'mobile') {
      setBattlesToRetreiveCount(1);
    } else {
      setBattlesToRetreiveCount(4);
    }
  }, [viewType]);

  const getQuery = () => {
    switch (type) {
      case 'followedBattles':
        return {
          query: GET_FOLLOWED_BATTLES,
          variables: {
            userId: 1,
            battleCount: battlesToRetrieveCount,
            dateRange: 'Weekly',
          },
        };
      case 'topBattles':
        return {
          query: GET_TOP_BATTLES,
          variables: {
            battleCount: battlesToRetrieveCount,
            dateRange: 'Weekly',
          },
        };
      default:
        return {};
    }
  };

  const queryData = getQuery();
  const { loading, data, error } = useQuery(queryData.query, {
    variables: queryData.variables,
  });

  if (loading) return <Loading />;

  const battles =
    type === 'followedBattles' ? data.followedBattles : data.topBattles;

  return (
    <>
      <UserPageHeadline
        displayText={
          type === 'followedBattles'
            ? 'BATTLERS YOU FOLLOW'
            : 'TOP BATTLES THIS WEEK'
        }
      ></UserPageHeadline>
      <ContentStyleWrapper width={BACKGROUND_CONTAINER_WIDTH}>
        <BattleRowContainer>
          <div className='battles-container'>
            {battles?.length > 0 ? (
              battles.map((battle) => (
                <div className='battle'>
                  <BattleLink key={battle.id} battle={battle} />
                </div>
              ))
            ) : (
              <div>
                {type === 'followedBattles'
                  ? 'None of the battlers you follow have battles in the last week'
                  : 'No battles that have finished voting in the last week'}
              </div>
            )}
          </div>
        </BattleRowContainer>
      </ContentStyleWrapper>
    </>
  );
}

export default BattleRow;
