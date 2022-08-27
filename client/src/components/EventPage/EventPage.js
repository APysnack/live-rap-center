import React from 'react';
import { GET_ALL_EVENTS } from './gql';
import { useQuery } from '@apollo/client';

function EventPage() {
  const { loading, data } = useQuery(GET_ALL_EVENTS);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {data?.events?.length > 0
        ? data.events.map((event) => (
            <div key={event.id}>
              <div>League name: {event.league.leagueName}</div>
              <div>Event name: {event.name}</div>
              <div>Address: {event.address}</div>
              <div>Admission: {event.admissionCost}</div>
              {event.battles?.length > 0
                ? event.battles.map((battle) =>
                    battle.battlers.map((battler) => (
                      <div key={battler.id}>{battler.name}</div>
                    ))
                  )
                : null}
            </div>
          ))
        : null}
    </div>
  );
}

export default EventPage;
