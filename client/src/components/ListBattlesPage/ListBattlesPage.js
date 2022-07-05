import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLES } from "./gql";
import { BattleLink } from "./ListBattles.styles";
import { Avatar } from "@mui/material";
const { REACT_APP_SERVER_URL } = process.env;

function ListBattlesPage() {
  const { loading, data } = useQuery(GET_BATTLES);

  // note there's no issue with the code, some battles arent assigned battlers in the db

  if (loading) return "Loading...";
  return (
    <>
      {data.battles.map((battle) => (
        <BattleLink to={`/battle/${battle.id}`} key={battle.id}>
          {battle.thumbnail ? (
            <Avatar
              src={REACT_APP_SERVER_URL + battle.thumbnail}
              sx={{ width: 100, height: 100 }}
              className="battleThumb"
            />
          ) : (
            <Avatar
              src={null}
              sx={{ width: 100, height: 100 }}
              className="battleThumb"
            />
          )}
          {battle.battlers.map((battler, i) => (
            <div key={battler.id}>
              {battler.name} {i % 2 === 0 ? <span>versus</span> : null}
            </div>
          ))}
        </BattleLink>
      ))}
    </>
  );
}

export default ListBattlesPage;
