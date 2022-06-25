import React, { useEffect, useState } from "react";
import { CREATE_LEAGUE_INVITATION, GET_USER_LEAGUE } from "./gql";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

function LeagueOwnerControls({ battler, leagueOwner, setFlashMessage }) {
  const [league, setLeague] = useState(null);
  const [createLeagueInvitation, { data: invitationData }] = useMutation(
    CREATE_LEAGUE_INVITATION
  );

  const { loading, data: leagueData } = useQuery(GET_USER_LEAGUE, {
    skip: !leagueOwner?.league_ids,
    variables: { id: leagueOwner.league_ids[0] },
  });

  const sendLeagueInvitation = () => {
    if (league?.id && battler.id) {
      createLeagueInvitation({
        variables: {
          leagueId: league.id,
          battlerId: battler.id,
        },
      });
    }
  };

  useEffect(() => {
    if (leagueData?.league) {
      setLeague(leagueData.league);
    }
  }, [leagueData]);

  useEffect(() => {
    if (invitationData) {
      if (invitationData.createLeagueInvitation) {
        setFlashMessage("League Invitation Sent!");
      } else {
        setFlashMessage(
          "You've already extended an invitation to this battler"
        );
      }
    }
  }, [invitationData]);

  if (loading) return "Loading...";

  return (
    <div>
      {battler?.league?.leagueName ? (
        <div>This battler already has a home league</div>
      ) : (
        <button onClick={sendLeagueInvitation}>
          ADD THIS BATTLER TO YOUR HOME LEAGUE
        </button>
      )}
      <div>BOOK THIS BATTLER FOR YOUR NEXT EVENT</div>
    </div>
  );
}

export default LeagueOwnerControls;
