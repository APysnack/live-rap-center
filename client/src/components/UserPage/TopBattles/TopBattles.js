import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_BATTLES } from "./gql";
import BattleLink from "../../SharedComponents/BattleLink/BattleLink";
import { TopBattlesWrapper } from "./TopBattles.styles";

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
    <TopBattlesWrapper>
      <div>Top Battles this week</div>
      {data?.topBattles?.length > 0
        ? data.topBattles.map((battle) => <BattleLink battle={battle} />)
        : "bar"}
    </TopBattlesWrapper>
  );
}

export default TopBattles;
