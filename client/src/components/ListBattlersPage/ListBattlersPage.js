import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BATTLERS } from "./gql";

function ListBattlersPage() {
  const { loading, data } = useQuery(GET_BATTLERS);

  if (loading) return "Loading...";
  return (
    <>
      {data?.battlers
        ? data.battlers.map((battler) => (
            <div key={battler.id}>{battler.name}</div>
          ))
        : null}
    </>
  );
}

export default ListBattlersPage;
