import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_USER_LEAGUE } from "./gql";
import { useQuery } from "@apollo/client";

function LeagueSettingsPage() {
  const { user } = useSelector((state) => state.user.userState);
  const [league, setLeague] = useState(null);
  const { loading, data } = useQuery(GET_USER_LEAGUE, {
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
    </>
  );
}

export default LeagueSettingsPage;
