import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  EventPageWrapper,
  EventDetailsContainer,
  BattleListContainer,
} from './EventPage.styles';
import { formatDate } from '../../utils/helperFunctions';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Payments from '@mui/icons-material/Payments';
import StyledRating from '../SharedComponents/StyledRating/StyledRating';
import Loading from '../SharedComponents/Loading/Loading';

const RATING_FONT_SIZE = '0.5em';

function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const { loading, data, refetch } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    options: {
      awaitRefetchQueries: true,
    },
  });

  useEffect(() => {
    if (data?.event) {
      setEvent(data.event);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <EventPageWrapper>
      {event ? (
        <div style={{ display: 'flex' }}>
          {event?.battles.length > 0 ? (
            <ContentContainer width={700} height={700}>
              <BattleListContainer>
                <div className='header-container'>Battles</div>
                <div className='scroll-section'>
                  {event.battles.map((battles, i) => (
                    <div key={i} className='battle-container'>
                      {battles.battlers.map((battler, i) =>
                        i % 2 === 0 ? (
                          <>
                            <div
                              className='battler-container battler-container-left'
                              key={battler.id}
                            >
                              {battler.name.toUpperCase()}
                              <StyledRating
                                value={battler.score}
                                fontSize={RATING_FONT_SIZE}
                              ></StyledRating>
                            </div>
                            <div className='versus'>VS</div>
                          </>
                        ) : (
                          <div
                            className='battler-container battler-container-right'
                            key={battler.id}
                          >
                            {battler.name.toUpperCase()}
                            <StyledRating
                              value={battler.score}
                              fontSize={RATING_FONT_SIZE}
                            ></StyledRating>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </BattleListContainer>
            </ContentContainer>
          ) : null}

          <ContentContainer width={700} height={700} flexDirection='column'>
            <EventDetailsContainer>
              <div className='header-container'> {event.name}</div>

              {event.flyerImageUrl ? (
                <img
                  className='flyer-img'
                  src={`${event.flyerImageUrl}`}
                  width={'325px'}
                ></img>
              ) : (
                <div className='flyer-img'>
                  This event does not have a flyer
                </div>
              )}

              <div className='details-container'>
                <div className='icon-container'>
                  <LocationOnIcon />
                  <div className='subtext'>{event.address}</div>
                </div>

                <div className='bottom-row'>
                  <div className='icon-container address'>
                    <CalendarMonth />
                    <div className='subtext'>
                      {formatDate(event.date, [
                        'includeWeekday',
                        'includeHour',
                        'includeMinute',
                      ])}
                    </div>
                  </div>

                  <div className='icon-container admission'>
                    <Payments />
                    <div className='subtext'>{event.admissionCost}</div>
                  </div>
                </div>
              </div>
            </EventDetailsContainer>
          </ContentContainer>
        </div>
      ) : null}
    </EventPageWrapper>
  );
}

export default EventPage;
