import React from 'react';
import CreateEventModal from '../CreateEventForm/CreateEventModal';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';
import EventLink from '../../SharedComponents/EventLink/EventLink';
import DeleteEventButton from '../DeleteEventButton/DeleteEventButton';

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
                <DeleteEventButton
                  key={`delete-event-${event.id}`}
                  event={event}
                  refetch={refetchLeague}
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
      { title: 'Create an Event', component: createEventModal },
      { title: 'Upcoming Events', component: upcomingEvents },
    ],
  };

  return (
    <SettingsGroup
      width={65}
      height={59}
      shadowWidth={50}
      headerWidth={65}
      settingsProps={settingsProps}
    ></SettingsGroup>
  );
}

export default EventSettings;
