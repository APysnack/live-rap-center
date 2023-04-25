import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_LEAGUE } from './gql';
import { useQuery } from '@apollo/client';
import { LeaguePageWrapper } from './LeaguePage.styles';
import EventLink from '../SharedComponents/EventLink/EventLink';
import Thumbnail from '../SharedComponents/Thumbnail/Thumbnail';

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
    <LeaguePageWrapper>
      {league ? (
        <>
          <Thumbnail
            className='league-logo-image'
            type='leagueLogo'
            object={league}
            fillParentContainer={false}
          />
          <div>League Score: {league.leagueScore}</div>
          <a href={`https://youtube.com/channel/${league.leagueUrl}`}>
            <div>Watch {league.leagueName} battles on YouTube</div>
          </a>
          <div className='league-battlers-container'>
            <span>
              <b>Battlers for this League</b>
            </span>
            {Object.keys(battlers).length > 0
              ? battlers.map((battler) => (
                  <div className='league-battler-container' key={battler.id}>
                    <div>{battler.name}</div>
                    <div>{battler.score}</div>
                  </div>
                ))
              : 'No battlers for this league'}
          </div>
          <div>Upcoming Events</div>
          {league?.upcomingEvents?.length > 0
            ? league.upcomingEvents.map((event) => (
                <EventLink key={event.id} event={event} />
              ))
            : 'No upcoming events'}
        </>
      ) : (
        <div>bar</div>
      )}
    </LeaguePageWrapper>
  );
}

export default LeaguePage;
