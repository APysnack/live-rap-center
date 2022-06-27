import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLERS } from "./gql";
import { Link } from "react-router-dom";
import { BattlerListContainer } from "./ListBattlers.styles";

function ListBattlersPage() {
  const { loading, data } = useQuery(GET_BATTLERS);

  if (loading) return "Loading...";
  return (
    <BattlerListContainer>
      {data?.battlers
        ? data.battlers.map((battler) => (
            <Link to={`/battler/${battler.id}`} key={battler.id}>
              {battler.name}
            </Link>
          ))
        : null}
    </BattlerListContainer>
  );
}

export default ListBattlersPage;
