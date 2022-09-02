import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_LEAGUE } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import EditLeagueForm from './EditLeagueForm/EditLeagueForm';
import CreateEventForm from './CreateEventForm/CreateEventForm';

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
    <>
      <div>Logged in as {user?.username}</div>
      {league ? (
        <div>Modifying league settings for {league.leagueName}</div>
      ) : null}
      <ImageUploadModal type='league logo' object={league} refetch={refetch} />
      <EditLeagueForm league={league} refetch={refetch} />
      <CreateEventForm league={league} refetch={refetch} />
      {league?.upcomingEvents?.length > 0 ? (
        <div>
          <div>Upcoming events</div>
          {league.upcomingEvents.map((event) => (
            <div>{event.name}</div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default LeagueSettingsPage;
