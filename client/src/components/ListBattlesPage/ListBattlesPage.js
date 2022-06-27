import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLES } from "./gql";
import { BattleLink } from "./ListBattles.styles";

function ListBattlesPage() {
  const { loading, data } = useQuery(GET_BATTLES);

  if (loading) return "Loading...";
  return (
    <>
      {data.battles.map((battle) => (
        <BattleLink to={`/battle/${battle.id}`} key={battle.id}>
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
