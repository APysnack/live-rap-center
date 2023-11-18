import React, { useState } from 'react';
import { ADD_BATTLE_TO_UPCOMING_EVENT } from './gql';
import { useMutation } from '@apollo/client';
import { AddBattleToEventContainer } from './AddBattleToEvent.styles';
import BattlerSelector from './BattlerSelector';

function AddBattleToEvent({ event, refetch }) {
  const [selectedBattlers, setSelectedBattlers] = useState({});

  const [addBattleToUpcomingEvent, { data }] = useMutation(
    ADD_BATTLE_TO_UPCOMING_EVENT,
    { onCompleted: refetch }
  );

  const handleSubmit = () => {
    const gqlVars = {
      variables: {
        leagueId: event.league.id,
        eventId: event.id,
        battlerIds: Object.values(selectedBattlers),
      },
    };

    console.log(gqlVars);

    // addBattleToUpcomingEvent(vars);
  };

  return (
    <AddBattleToEventContainer>
      <div className='header-container'>Add Battle</div>
      <div className='form-container'>
        <BattlerSelector
          selectedBattlers={selectedBattlers}
          setSelectedBattlers={setSelectedBattlers}
        />

        <div className='lrc-button' onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </AddBattleToEventContainer>
  );
}

export default AddBattleToEvent;
