import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_USER_LEAGUE } from "./gql";
import { useQuery } from "@apollo/client";
import ImageUploadModal from "../SharedComponents/ImageUploadModal/ImageUploadModal";

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
      <ImageUploadModal type="league logo" league={league} refetch={refetch} />
      {league ? (
        <div>Modifying league settings for {league.leagueName}</div>
      ) : null}
    </>
  );
}

export default LeagueSettingsPage;
