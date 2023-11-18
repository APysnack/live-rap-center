import React, { useState } from 'react';
import BattlerSearchBox from './BattlerSearchBox';
import { BattlerSelectorContainer } from './AddBattleToEvent.styles';
import { useQuery } from '@apollo/client';
import { GET_ALL_BATTLERS } from './gql';
import BattlerProfilePanel from './BattlerProfilePanel';

// TODO: Make adjustable for triple threat and 2v2
const BATTLERS_PER_BATTLE = 2;

function BattlerSelector({ selectedBattlers, setSelectedBattlers }) {
  const [displayedBattlers, setDisplayedBattlers] = useState([]);
  const [displayedBattlerIds, setDisplayedBattlerIds] = useState(['1', '2']);

  const { loading, data, refetch } = useQuery(GET_ALL_BATTLERS, {
    variables: { ids: displayedBattlerIds },
    onCompleted: (result) => {
      setDisplayedBattlers(result.battlers.battlers);
    },
  });

  // TODO: set selected battler which will be used for the creation of the battle
  const onSelect = (battlerObj) => {
    setDisplayedBattlerIds((prevBattlerIds) => {
      const updatedBattlerIds = [...prevBattlerIds];

      for (const key in battlerObj) {
        const index = parseInt(key, 10);
        updatedBattlerIds[index] = battlerObj[key];
      }

      return updatedBattlerIds;
    });
  };

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
      </div>
    </BattlerSelectorContainer>
  );
}

export default BattlerSelector;
