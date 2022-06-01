import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLES } from "./gql";

function ListBattlesPage() {
  const { loading, data } = useQuery(GET_BATTLES);

  if (loading) return "Loading...";
  return (
    <>
      {data.battles.map((battle) => (
        <div key={battle.id}>
          {battle.battlers.map((battler) => (
            <div key={battler.id}>{battler.name}</div>
          ))}
        </div>
      ))}
    </>
  );
}

export default ListBattlesPage;
