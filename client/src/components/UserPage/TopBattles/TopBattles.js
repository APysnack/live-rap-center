import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_BATTLES } from "./gql";

function TopBattles() {
  const { loading, data, error } = useQuery(GET_TOP_BATTLES, {
    variables: { battleCount: 5, dateRange: "Weekly" },
  });

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [data]);

  if (loading) return "Loading...";
  return (
    <>
      {data?.topBattles?.length > 0
        ? data.topBattles.map((battle) => {
            <div>Foo</div>;
          })
        : "bar"}
    </>
  );
}

export default TopBattles;
