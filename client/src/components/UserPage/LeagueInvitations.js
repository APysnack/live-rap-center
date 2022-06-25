import React, { useState } from "react";
import BasicModal from "../SharedComponents/BasicModal";
import { LeagueInvitationContainer } from "./LeagueInvitations.styles";
import { ADD_HOME_LEAGUE_TO_BATTLER } from "./gql";
import { useMutation } from "@apollo/client";

function LeagueInvitations({ battler }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addLeagueToBattler, { data, loading, error }] = useMutation(
    ADD_HOME_LEAGUE_TO_BATTLER
  );

  const acceptLeagueInvitation = (leagueId) => {
    setModalOpen(false);
    addLeagueToBattler({
      variables: { leagueId: leagueId, battlerId: battler.id },
    });
  };
  const denyLeagueInvitation = (leagueId) => {
    console.log(`denied invitation for ${leagueId}`);
  };

  return (
    <div>
      {battler?.potentialLeagues ? (
        <button onClick={() => setModalOpen(true)}>
          You have league invitations
        </button>
      ) : (
        <div>You currently do not have any league invitations</div>
      )}
      <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>Pending League Invitations</div>
        {battler.potentialLeagues.map((league) => (
          <LeagueInvitationContainer key={league.id}>
            <div>{league.leagueName}</div>
            <button onClick={() => acceptLeagueInvitation(league.id)}>
              Accept
            </button>
            <button onClick={() => denyLeagueInvitation(league.id)}>
              Deny
            </button>
          </LeagueInvitationContainer>
        ))}
      </BasicModal>
    </div>
  );
}

export default LeagueInvitations;
