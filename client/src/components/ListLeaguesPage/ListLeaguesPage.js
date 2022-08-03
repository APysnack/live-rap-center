import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LEAGUES } from "./gql";
import { LeagueListContainer, LeagueLink } from "./ListLeagues.styles";
import { Avatar } from "@mui/material";
const { REACT_APP_SERVER_URL } = process.env;

function ListLeaguesPage() {
  const { loading, data } = useQuery(GET_LEAGUES);

  if (loading) return "Loading...";
  return (
    <>
      {data ? (
        <LeagueListContainer>
          {data.leagues.map((league) => (
            <LeagueLink to={`/league/${league.id}`} key={league.id}>
              {league.logoUrl ? (
                <Avatar
                  src={REACT_APP_SERVER_URL + league.logoUrl}
                  sx={{ width: 100, height: 100 }}
                  className="leagueLogo"
                />
              ) : (
                <Avatar
                  src={null}
                  sx={{ width: 100, height: 100 }}
                  className="leagueLogo"
                />
              )}
              <div>{league.leagueName}</div>
            </LeagueLink>
          ))}
        </LeagueListContainer>
      ) : null}
    </>
  );
}

export default ListLeaguesPage;
