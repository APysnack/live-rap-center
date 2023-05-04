import React, { useState } from 'react';
import { ADD_BATTLE_TO_UPCOMING_EVENT } from './gql';
import { useMutation } from '@apollo/client';
import { AddBattleToEventContainer } from './AddBattleToEvent.styles';
import BattlerSearchBox from './BattlerSearchBox';

const BATTLERS_PER_BATTLE = 2;

function AddBattleToEvent({ event, refetch }) {
  const [selectedBattlers, setSelectedBattlers] = useState({});

  const [addBattleToUpcomingEvent, { data }] = useMutation(
    ADD_BATTLE_TO_UPCOMING_EVENT,
    { onCompleted: refetch }
  );

  React.useEffect(() => {
    console.log(event);
  }, []);

  const handleSubmit = () => {
    if (Object.keys(selectedBattlers).length === BATTLERS_PER_BATTLE) {
      addBattleToUpcomingEvent({
        variables: {
          leagueId: event.league.id,
          eventId: event.id,
          battlerIds: Object.values(selectedBattlers),
        },
      });
    }
  };

  return (
    <AddBattleToEventContainer>
      <div className='header-container'>Add Battle</div>
      <div className='form-container'>
        {[...Array(BATTLERS_PER_BATTLE)].map((e, i) => (
          <BattlerSearchBox
            key={i}
            className='search-box'
            componentNumber={i}
            selectedBattlers={selectedBattlers}
            setSelectedBattlers={setSelectedBattlers}
          />
        ))}
        <div className='lrc-button' onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </AddBattleToEventContainer>
  );
}

export default AddBattleToEvent;
