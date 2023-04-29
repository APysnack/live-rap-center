import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_LEAGUE, GET_BATTLES } from './gql';
import { useQuery } from '@apollo/client';
import {
  LeaguePageWrapper,
  SummaryContainer,
  EventsContainer,
  LeagueBattlersContainer,
} from './LeaguePage.styles';
import EventLink from '../SharedComponents/EventLink/EventLink';
import Thumbnail from '../SharedComponents/Thumbnail/Thumbnail';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import YouTube from '@mui/icons-material/YouTube';
import StyledRating from '../SharedComponents/StyledRating/StyledRating';
import BattleLink from '../SharedComponents/BattleLink/BattleLink';

function LeaguePage() {
  let { leagueId } = useParams();
  const [league, setLeague] = useState({});
  const [battlers, setBattlers] = useState({});
  const [battles, setBattles] = useState({});

  const appendZero = (number) => {
    return number < 10 ? '0' + number : number;
  };

  const { loading, data } = useQuery(GET_LEAGUE, {
    variables: { id: leagueId },
  });

  const { loading: battlesLoading, data: battleData } = useQuery(GET_BATTLES, {
    variables: {
      leagueId: leagueId,
      firstPageToFetch: 1,
    },
  });

  useEffect(() => {
    if (data?.league) {
      setLeague(data.league);
      setBattlers(data.league.battlers);
    }
  }, [data]);

  useEffect(() => {
    if (battleData) {
      setBattles(battleData.battles.battles);
    }
  }, [battleData]);

  if (loading || battlesLoading) return 'Loading...';
  return (
    <LeaguePageWrapper>
      {league?.leagueName ? (
        <>
          <div className='horizontal-wrapper'>
            <ContentContainer flexDirection='column' width={1000} height={1125}>
              <SummaryContainer>
                <div className='league-header-container'>
                  <div className='league-rating-container'>
                    <StyledRating value={league.leagueScore} fontSize='1em' />
                    <div className='overall-text'>OVERALL</div>
                    <div className='score-text'>{league.leagueScore}</div>
                    <div className='rank-text'>RANK: 1</div>
                  </div>

                  <div className='league-name-container'>
                    {league.leagueName.toUpperCase()}
                  </div>
                </div>

                <div className='info-container'>
                  <div className='section-header'>LATEST BATTLES</div>
                  <div className='battles-container'>
                    {battles?.length > 0
                      ? battles.map((battle) => {
                          return <BattleLink id={battle.id} battle={battle} />;
                        })
                      : null}
                  </div>
                </div>
              </SummaryContainer>
            </ContentContainer>
            <div className='vertical-wrapper'>
              {battlers.length > 0 ? (
                <ContentContainer height={'33em'} width={700}>
                  <LeagueBattlersContainer>
                    <div className='header-container'>Roster</div>
                    <div className='roster-container'>
                      {Object.keys(battlers).length > 0
                        ? battlers.map((battler, i) => (
                            <div
                              className='league-battler-container'
                              key={battler.id}
                            >
                              <div>{appendZero(i + 1)}</div>
                              <div className='name-container'>
                                <div>{battler.name}</div>
                                <StyledRating
                                  value={battler.score}
                                  fontSize='0.6em'
                                />
                              </div>

                              <div>{battler.score}</div>
                            </div>
                          ))
                        : 'No battlers for this league'}
                    </div>
                  </LeagueBattlersContainer>
                </ContentContainer>
              ) : null}

              <ContentContainer flexDirection='column' width={700} height={600}>
                <EventsContainer>
                  <div className='header-container'>Upcoming Events</div>
                  <div className='form-background'>
                    {league?.upcomingEvents?.length > 0
                      ? league.upcomingEvents.map((event) => (
                          <EventLink key={event.id} event={event} />
                        ))
                      : 'No upcoming events'}
                  </div>
                </EventsContainer>
              </ContentContainer>
            </div>
          </div>
        </>
      ) : (
        <div>bar</div>
      )}
    </LeaguePageWrapper>
  );
}

export default LeaguePage;
