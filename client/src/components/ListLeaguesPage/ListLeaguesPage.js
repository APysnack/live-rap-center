import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LEAGUES } from "./gql";

function ListLeaguesPage() {
  const { loading, data } = useQuery(GET_LEAGUES);

  if (loading) return "Loading...";
  return (
    <>
      {data.leagues.map((league) => (
        <div key={league.id}>{league.leagueName}</div>
      ))}
    </>
  );
}

export default ListLeaguesPage;
