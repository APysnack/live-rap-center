import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_LEAGUE } from './gql';
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

function LeaguePage() {
  let { leagueId } = useParams();
  const [league, setLeague] = useState({});
  const [battlers, setBattlers] = useState({});

  const appendZero = (number) => {
    return number < 10 ? '0' + number : number;
  };

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
      {league?.leagueName ? (
        <>
          <div className='horizontal-wrapper'>
            <ContentContainer
              flexDirection='column'
              width={1100}
              height={'100%'}
            >
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
                  <div className='thumbnail-size-control'>
                    <Thumbnail
                      className='league-logo-image'
                      type='leagueLogo'
                      object={league}
                    />
                  </div>

                  <a href={`https://youtube.com/channel/${league.leagueUrl}`}>
                    <div className='lrc-button'>
                      <YouTube />
                      <div>YouTube</div>
                    </div>
                  </a>
                </div>
              </SummaryContainer>
            </ContentContainer>
            <div clasName='vertical-wrapper'>
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
