import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_LEAGUE } from "./gql";
import { useQuery } from "@apollo/client";

function LeaguePage() {
  let { leagueId } = useParams();
  const [league, setLeague] = useState({});
  const [battlers, setBattlers] = useState({});

  const { loading, data } = useQuery(GET_LEAGUE, {
    variables: { id: leagueId },
  });

  useEffect(() => {
    if (data?.league) {
      setLeague(data.league);
      setBattlers(data.league.battlers);
    }
  }, [data]);

  if (loading) return "Loading...";
  return (
    <>
      {league ? (
        <>
          <div>{league.leagueName}</div>
          <div>{league.leagueUrl}</div>
          {Object.keys(battlers).length > 0
            ? battlers.map((battler) => <div>{battler.name}</div>)
            : "No battlers for this league"}
        </>
      ) : (
        <div>bar</div>
      )}
    </>
  );
}

export default LeaguePage;
