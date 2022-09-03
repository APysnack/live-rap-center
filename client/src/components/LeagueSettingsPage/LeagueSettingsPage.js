import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_LEAGUE } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import EditLeagueForm from './EditLeagueForm/EditLeagueForm';
import CreateEventModal from './CreateEventForm/CreateEventModal';
import EventLink from '../SharedComponents/EventLink/EventLink';
import DeleteEventButton from './DeleteEventButton/DeleteEventButton';

function LeagueSettingsPage() {
  const { user } = useSelector((state) => state.user.userState);
  const [league, setLeague] = useState(null);

  // currently only providing support for being admin of one league, hence the league_ids[0]
  // of the array. will consider extending support for multiple leagues in the future
  const { loading, data, refetch } = useQuery(GET_USER_LEAGUE, {
    skip: !user?.league_ids,
    variables: { id: user.league_ids[0] },
  });

  useEffect(() => {
    if (data?.league) {
      setLeague(data.league);
    }
  }, [data]);

  return (
    <div>
      <div>Logged in as {user?.username}</div>
      {league ? (
        <div>Modifying league settings for {league.leagueName}</div>
      ) : null}
      <ImageUploadModal type='league logo' object={league} refetch={refetch} />
      <EditLeagueForm league={league} refetch={refetch} />
      <CreateEventModal league={league} refetch={refetch} />
      <div>
        <div>Upcoming events</div>
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
                  refetch={refetch}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>No events currently planned</div>
        )}
      </div>
    </div>
  );
}

export default LeagueSettingsPage;
