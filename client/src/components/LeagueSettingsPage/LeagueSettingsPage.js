import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_WITH_LEAGUES } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import EditLeagueForm from './EditLeagueForm/EditLeagueForm';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import EventSettings from './EventSettings/EventSettings';
import { LeagueSettingsContainer } from './LeagueSettings.styles';

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
    <LeagueSettingsContainer>
      <EventSettings league={league} refetchLeague={refetch}></EventSettings>
      <div>
        <ContentContainer
          width={520}
          height={180}
          justifyContent={'flex-start'}
        >
          <ImageUploadModal
            type='league logo'
            object={league}
            refetch={refetch}
          />
        </ContentContainer>

        <EditLeagueForm league={league} refetch={refetch} />
      </div>
    </LeagueSettingsContainer>
  );
}

export default LeagueSettingsPage;
