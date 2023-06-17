import React from 'react';
import CreateEventModal from '../CreateEventForm/CreateEventModal';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';
import EventLink from '../../SharedComponents/EventLink/EventLink';

function EventSettings({ league, refetchLeague }) {
  const createEventModal = () => {
    return <CreateEventModal league={league} refetchLeague={refetchLeague} />;
  };

  const upcomingEvents = () => {
    return (
      <div>
        {league?.upcomingEvents?.length > 0 ? (
          <div>
            {league.upcomingEvents.map((event) => (
              <div key={event.id}>
                <EventLink
                  key={`event-link-${event.id}`}
                  event={event}
                  type='edit'
                />
              </div>
            ))}
            {league.upcomingEvents.map((event) => (
              <div key={event.id}>
                <EventLink
                  key={`event-link-${event.id}`}
                  event={event}
                  type='edit'
                />
              </div>
            ))}
            {league.upcomingEvents.map((event) => (
              <div key={event.id}>
                <EventLink
                  key={`event-link-${event.id}`}
                  event={event}
                  type='edit'
                />
              </div>
            ))}
            {league.upcomingEvents.map((event) => (
              <div key={event.id}>
                <EventLink
                  key={`event-link-${event.id}`}
                  event={event}
                  type='edit'
                />
              </div>
            ))}
          </div>
        ) : (
          <div>No events currently planned</div>
        )}
      </div>
    );
  };

  const settingsProps = {
    header: 'Events',
    components: [
      {
        title: 'Upcoming Events',
        component: upcomingEvents,
        scrollEnabled: true,
      },
      { title: '', component: createEventModal, backgroundDisabled: true },
    ],
  };

  return (
    <SettingsGroup
      width={55}
      height={70}
      shadowWidth={50}
      shadowHeight={58}
      headerWidth={54}
      settingsProps={settingsProps}
    ></SettingsGroup>
  );
}

export default EventSettings;
