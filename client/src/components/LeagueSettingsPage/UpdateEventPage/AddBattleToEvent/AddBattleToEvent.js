import React, { useState } from 'react';
import { ADD_BATTLE_TO_UPCOMING_EVENT } from './gql';
import { useMutation, useQuery } from '@apollo/client';
import { AddBattleToEventContainer } from './AddBattleToEvent.styles';
import BattlerSelector from './BattlerSelector';
import { useSelector } from 'react-redux';
import { GET_USER_WITH_LEAGUES } from './gql';

function AddBattleToEvent({ event, refetch }) {
  const { user } = useSelector((state) => state.user.userState);

  const [selectedBattlers, setSelectedBattlers] = useState({});
  const [league, setLeague] = useState(null);

  const [addBattleToUpcomingEvent, result] = useMutation(
    ADD_BATTLE_TO_UPCOMING_EVENT,
    { onCompleted: refetch }
  );

  const { loading, data } = useQuery(GET_USER_WITH_LEAGUES, {
    skip: !user?.id,
    variables: { id: user.id },
    onCompleted: (result) => {
      setLeague(result.user.ownedLeagues[0]);
    },
  });

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
          league={league}
        />

        <div className='lrc-button' onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </AddBattleToEventContainer>
  );
}

export default AddBattleToEvent;
