import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_WITH_LEAGUES } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import EditLeagueForm from './EditLeagueForm/EditLeagueForm';
import CreateEventModal from './CreateEventForm/CreateEventModal';
import EventLink from '../SharedComponents/EventLink/EventLink';
import DeleteEventButton from './DeleteEventButton/DeleteEventButton';

function LeagueSettingsPage() {
  const { user } = useSelector((state) => state.user.userState);
  const [currentUser, setCurrentUser] = useState(null);
  const [league, setLeague] = useState(null);

  // currently only providing support for being admin of one league, hence the league_ids[0]
  // of the array. will consider extending support for multiple leagues in the future
  const { loading, data, refetch } = useQuery(GET_USER_WITH_LEAGUES, {
    skip: !user?.id,
    variables: { id: user.id },
  });

  useEffect(() => {
    if (data?.user?.ownedLeagues) {
      // currently assumes the user only owns one league and grabs the first index in the array
      // additional changes needed to support multiple leagues
      setLeague(data.user.ownedLeagues[0]);
      setCurrentUser(data.user);
      console.log(data.user);
    }
  }, [data]);

  return (
    <div>
      <div>Logged in as {currentUser?.username}</div>
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
