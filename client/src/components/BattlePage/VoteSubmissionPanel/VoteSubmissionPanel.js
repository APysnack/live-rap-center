import React from "react";
import CreateVoteForm from "./CreateVoteForm/CreateVoteForm";
import StarSelector from "./StarSelector/StarSelector";
import { useMutation } from "@apollo/client";
import { CREATE_BATTLE_VOTE } from "./gql";

function VoteSubmissionPanel({ user, battle }) {
  const [createBattleVote, { data, loading, error }] =
    useMutation(CREATE_BATTLE_VOTE);

  const submitVote = (formData) => {
    if (formData.comment !== "") {
      createBattleVote({
        variables: {
          userId: user.id,
          battleId: battle.id,
          loserBattlerId: battle.battlers[0].id,
          winnerBattlerId: battle.battlers[1].id,
          loserBattlerScore: 7,
          winnerBattlerScore: 8,
          comment: formData.comment,
        },
      });
    }
  };
  return (
    <>
      {battle?.battlers?.length > 0 ? (
        <div>
          {battle.battlers.map((battler) => (
            <StarSelector key={battler.id} battler={battler} />
          ))}
          <CreateVoteForm onSubmit={submitVote} />
        </div>
      ) : null}
    </>
  );
}

export default VoteSubmissionPanel;
