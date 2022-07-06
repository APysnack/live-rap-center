import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LEAGUES } from "./gql";
import { Link } from "react-router-dom";
import { LeagueListContainer, LeagueLink } from "./ListLeagues.styles";
import { Avatar } from "@mui/material";
const { REACT_APP_SERVER_URL } = process.env;

function ListLeaguesPage() {
  const { loading, data } = useQuery(GET_LEAGUES);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return "Loading...";
  return (
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
  );
}

export default ListLeaguesPage;
