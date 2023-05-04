import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventCalendarContainer } from './EventCalendar.styles';
import { useTheme } from 'styled-components';

import DoubleArrow from '@mui/icons-material/DoubleArrow';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';

const localizer = momentLocalizer(moment);
const todaysDate = new Date();

function EventCalendar({
  eventData,
  handleSelectEvent,
  selectedCountry,
  setSelectedCountry,
  selectedRegion,
  setSelectedRegion,
}) {
  const [eventsList, setEventsList] = useState([]);
  const [visibleMonth, setVisibleMonth] = useState(moment());
  const theme = useTheme();

  const calendarStyle = {
    width: '70vw',
    height: '70vh',
    backgroundColor: theme.secondary,
    fontWeight: '700',
  };

  const dayPropGetter = (date) => {
    const dayStyle = {};
    if (date < todaysDate) {
      dayStyle.backgroundColor = theme.primaryContrast;
    } else {
      dayStyle.backgroundColor = theme.primary;
    }
    return {
      style: dayStyle,
    };
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = theme.secondary;
    // eventPropGetter and dayPropGetter are from react big calendar
    // to change style based on type, add a type field to events (as show below)
    // if (event.type === 'birthday') {
    //   backgroundColor = 'blue';
    // }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      color: 'white',
      border: 'solid 1px black',
      display: 'block',
      boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    };
    return {
      style: style,
    };
  };

  useEffect(() => {
    if (eventData?.events) {
      updateEventsList(eventData);
    }
  }, [eventData]);

  const makeNextMonthVisible = () => {
    setVisibleMonth(moment(visibleMonth).add(1, 'month').toDate());
  };

  const makePrevMonthVisible = () => {
    setVisibleMonth(moment(visibleMonth).subtract(1, 'month').toDate());
  };

  const updateEventsList = (data) => {
    let tempArr = [];
    data.events.forEach((event) => {
      let tempObj = {
        id: event.id,
        title: event.name,
        leagueName: event.league.leagueName,
        address: event.address,
        flyerImageUrl: event.flyerImageUrl,
        admissionCost: event.admissionCost,
        allDay: true,
        start: event.date,
        end: event.date,
      };
      tempArr.push(tempObj);
    });
    setEventsList(tempArr);
  };

  return (
    <EventCalendarContainer>
      <div className='month-paginator'>
        <div className='paginator-items'>
          <DoubleArrow
            className='calendar-arrow'
            style={{ transform: 'rotate(180deg)' }}
            onClick={makePrevMonthVisible}
          />
          <div className='month-text'>
            {moment(visibleMonth).format('MMMM YYYY')}
          </div>
          <DoubleArrow
            className='calendar-arrow'
            onClick={makeNextMonthVisible}
          />
        </div>
      </div>
      <div className='main-content'>
        <ContentContainer width='75vw' height='75vh'>
          <Calendar
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            className='event-calendar'
            localizer={localizer}
            events={eventsList}
            startAccessor='start'
            endAccessor='end'
            showAllEvents={true}
            style={calendarStyle}
            onSelectEvent={handleSelectEvent}
            toolbar={false}
            date={visibleMonth}
            onNavigate={(date) => {
              setVisibleMonth({ selectedDate: visibleMonth });
            }}
            components={{
              month: {
                dateHeader: ({ date, label }) => {
                  return (
                    <h1
                      style={
                        date < todaysDate
                          ? { color: theme.primary }
                          : { color: theme.primaryContrast }
                      }
                    >
                      {label}
                    </h1>
                  );
                },
              },
            }}
          />
        </ContentContainer>
        <ContentContainer
          width={'20vw'}
          height={'75vh'}
          alignItems='flex-start'
        >
          <div className='filter-component'>
            <div className='filter-text'>Find Events Near You</div>
            <CountryDropdown
              value={selectedCountry}
              onChange={(value) => setSelectedCountry(value)}
            />
            {selectedCountry ? (
              <RegionDropdown
                country={selectedCountry}
                value={selectedRegion}
                onChange={(value) => setSelectedRegion(value)}
              />
            ) : null}
          </div>
        </ContentContainer>
      </div>
    </EventCalendarContainer>
  );
}

export default EventCalendar;
