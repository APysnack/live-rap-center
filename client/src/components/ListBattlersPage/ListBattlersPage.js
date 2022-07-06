import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLERS } from "./gql";
import { BattlerListContainer, BattlerLink } from "./ListBattlers.styles";
import { Avatar } from "@mui/material";
const { REACT_APP_SERVER_URL } = process.env;

function ListBattlersPage() {
  const { loading, data } = useQuery(GET_BATTLERS);

  if (loading) return "Loading...";
  return (
    <BattlerListContainer>
      {data?.battlers.map((battler) => (
        <BattlerLink to={`/battler/${battler.id}`} key={battler.id}>
          {battler?.user?.profilePictureUrl ? (
            <Avatar
              src={REACT_APP_SERVER_URL + battler.user.profilePictureUrl}
              sx={{ width: 100, height: 100 }}
              className="battlerImage"
            />
          ) : (
            <Avatar
              src={REACT_APP_SERVER_URL + battler.image}
              sx={{ width: 100, height: 100 }}
              className="battlerImage"
            />
          )}
          <div>{battler.name}</div>
          <div>{battler.score}</div>
        </BattlerLink>
      ))}
    </BattlerListContainer>
  );
}

export default ListBattlersPage;
