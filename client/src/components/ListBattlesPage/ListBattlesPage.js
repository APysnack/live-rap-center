import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLES } from "./gql";
import BattleLink from "../SharedComponents/BattleLink/BattleLink";

function ListBattlesPage() {
  const { loading, data } = useQuery(GET_BATTLES);

  // note there's no issue with the code, some battles arent assigned battlers in the seeded db

  if (loading) return "Loading...";
  return (
    <>
      {data.battles.map((battle) => (
        <BattleLink battle={battle} />
      ))}
    </>
  );
}

export default ListBattlesPage;
