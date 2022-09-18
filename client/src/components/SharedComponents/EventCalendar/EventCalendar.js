import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventCalendarContainer } from './EventCalendar.styles';

const localizer = momentLocalizer(moment);

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
      <div className='toolbar'>
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
        <div>{moment(visibleMonth).format('MMMM')}</div>
        <div onClick={makePrevMonthVisible}>Back</div>
        <div onClick={makeNextMonthVisible}>Next</div>
      </div>

      <Calendar
        localizer={localizer}
        events={eventsList}
        startAccessor='start'
        endAccessor='end'
        showAllEvents={true}
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        toolbar={false}
        date={visibleMonth}
        onNavigate={(date) => {
          setVisibleMonth({ selectedDate: visibleMonth });
        }}
      />
    </EventCalendarContainer>
  );
}

export default EventCalendar;
