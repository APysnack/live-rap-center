import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import { GET_ALL_EVENTS } from './gql';
import { useQuery } from '@apollo/client';

function EventCalendar() {
  const { loading, data } = useQuery(GET_ALL_EVENTS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <Calendar />
    </div>
  );
}

export default EventCalendar;
