import React, { useState } from 'react';
import BattlerSearchBox from './BattlerSearchBox';
import { BattlerSelectorContainer } from './AddBattleToEvent.styles';
import { useQuery } from '@apollo/client';
import { GET_ALL_BATTLERS } from './gql';
import BattlerProfilePanel from './BattlerProfilePanel';
import BattleProjections from './BattleProjections';
import Loading from '../../../SharedComponents/Loading/Loading';

// TODO: Make adjustable for triple threat and 2v2
const BATTLERS_PER_BATTLE = 2;

function BattlerSelector({ selectedBattlers, setSelectedBattlers }) {
  const [displayedBattlers, setDisplayedBattlers] = useState([]);
  const [displayedBattlerIds, setDisplayedBattlerIds] = useState(['1', '2']);

  // TODO: Reduce the number of records being fetched then make changes to query on search
  const { loading, data } = useQuery(GET_ALL_BATTLERS, {
    variables: { fetchAll: true },
  });

  const queryResult = useQuery(GET_ALL_BATTLERS, {
    variables: { ids: displayedBattlerIds },
    onCompleted: (result) => {
      setDisplayedBattlers(result.battlers.battlers);
    },
  });

  const onSelect = (battlerObj) => {
    setDisplayedBattlerIds((prevBattlerIds) => {
      const updatedBattlerIds = [...prevBattlerIds];

      for (const key in battlerObj) {
        const index = parseInt(key, 10);
        if (!isNaN(index) && index >= 0 && index < updatedBattlerIds.length) {
          updatedBattlerIds[index] = battlerObj[key];
        }
      }

      return updatedBattlerIds;
    });
  };

  if (loading) return <Loading />;

  return (
    <BattlerSelectorContainer>
      <div>
        <div className='battler-selector-panel'>
          {[...Array(BATTLERS_PER_BATTLE)].map((e, i) => (
            <BattlerSearchBox
              key={i}
              className='search-box'
              componentNumber={i}
              onSelect={onSelect}
              data={data}
            />
          ))}
        </div>
        <div className='battler-panel-container'>
          {displayedBattlers?.length > 0
            ? displayedBattlers.map((battler, i) => (
                <BattlerProfilePanel key={i} battler={battler} i={i} />
              ))
            : 'No battlers for this league'}
        </div>
        <BattleProjections battlers={displayedBattlers} />
      </div>
    </BattlerSelectorContainer>
  );
}

export default BattlerSelector;
