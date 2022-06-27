import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LEAGUES } from "./gql";
import { Link } from "react-router-dom";
import { LeagueListContainer } from "./ListLeagues.styles";

function ListLeaguesPage() {
  const { loading, data } = useQuery(GET_LEAGUES);

  if (loading) return "Loading...";
  return (
    <LeagueListContainer>
      {data.leagues.map((league) => (
        <Link to={`/league/${league.id}`} key={league.id}>
          {league.leagueName}
        </Link>
      ))}
    </LeagueListContainer>
  );
}

export default ListLeaguesPage;
