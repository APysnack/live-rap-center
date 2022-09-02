import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_LEAGUE } from './gql';
import { useQuery } from '@apollo/client';
import { LeagueBattlersContainer } from './LeaguePage.styles';
import EventLink from '../SharedComponents/EventLink/EventLink';

function LeaguePage() {
  let { leagueId } = useParams();
  const [league, setLeague] = useState({});
  const [battlers, setBattlers] = useState({});

  const { loading, data } = useQuery(GET_LEAGUE, {
    variables: { id: leagueId },
  });

  useEffect(() => {
    if (data?.league) {
      setLeague(data.league);
      setBattlers(data.league.battlers);
    }
  }, [data]);

  if (loading) return 'Loading...';
  return (
    <>
      {league ? (
        <>
          <a href={`https://youtube.com/channel/${league.leagueUrl}`}>
            <div>Watch {league.leagueName} battles on YouTube</div>
          </a>
          <LeagueBattlersContainer>
            <span>
              <b>Battlers for this League</b>
            </span>
            {Object.keys(battlers).length > 0
              ? battlers.map((battler) => (
                  <div key={battler.id}>{battler.name}</div>
                ))
              : 'No battlers for this league'}
          </LeagueBattlersContainer>
          <div>Upcoming Events</div>
          {league?.upcomingEvents?.length > 0
            ? league.upcomingEvents.map((event) => <EventLink event={event} />)
            : 'No upcoming events'}
        </>
      ) : (
        <div>bar</div>
      )}
    </>
  );
}

export default LeaguePage;
