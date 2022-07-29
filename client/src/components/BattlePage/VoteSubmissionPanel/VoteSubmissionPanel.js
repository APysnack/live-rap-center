import React, { useEffect, useState } from "react";
import CreateVoteForm from "./CreateVoteForm/CreateVoteForm";
import StarSelector from "./StarSelector/StarSelector";
import { useMutation } from "@apollo/client";
import { CREATE_BATTLE_VOTE } from "./gql";

function VoteSubmissionPanel({ user, battle }) {
  const [createBattleVote, { data, loading, error }] =
    useMutation(CREATE_BATTLE_VOTE);

  const [starState, setStarState] = useState({});
  const [checkedState, setCheckedState] = useState({});
  const [disableChecks, setDisableChecks] = useState(false);

  useEffect(() => {
    console.log(starState);
    console.log(checkedState);
  }, [starState, checkedState]);

  useEffect(() => {
    loadDefaultCheckState();
  }, []);

  // creates an object with all battler ids with winner checkbox state set to false
  const loadDefaultCheckState = () => {
    let objects = {};
    battle.battlers.forEach((battler) => {
      let tempObj = { [battler.id]: false };
      objects = { ...objects, ...tempObj };
    });
    setCheckedState({ ...checkedState, ...objects });
  };

  // currently does not handle 2v2s.  loserIds[0] gets first/only item in array
  // will need to parse all elements in winnerIds/loserIds for 2v2
  const submitVote = (formData) => {
    if (voteCompleted(formData) === true) {
      let winnerIds = Object.keys(checkedState).filter(
        (key) => checkedState[key]
      );
      let loserIds = Object.keys(checkedState).filter(
        (key) => !checkedState[key]
      );
      createBattleVote({
        variables: {
          userId: user.id,
          battleId: battle.id,
          loserBattlerId: parseInt(loserIds[0]),
          winnerBattlerId: parseInt(winnerIds[0]),
          loserBattlerScore: starState[parseInt(loserIds[0])],
          winnerBattlerScore: starState[parseInt(winnerIds[0])],
          comment: formData.comment,
        },
      });
    }
  };

  const voteCompleted = (formData) => {
    if (
      formData.comment !== "" &&
      Object.keys(starState).length > 1 &&
      disableChecks === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  // tracks the star ratings for each battler
  const updateStarState = (battlerId, value) => {
    const tempObj = {
      [battlerId]: value,
    };
    setStarState({ ...starState, ...tempObj });
  };

  // only updates when the user selects a winner. Sets all other battler checkbox states to false
  const updateCheckState = (battlerId, value) => {
    loadDefaultCheckState();
    if (value === true) {
      const tempObj = {
        [battlerId]: value,
      };
      setCheckedState({ ...checkedState, ...tempObj });
    }
    setDisableChecks(!disableChecks);
  };

  return (
    <>
      {battle?.battlers?.length > 0 ? (
        <div>
          {battle.battlers.map((battler) => (
            <StarSelector
              key={battler.id}
              battler={battler}
              updateStarState={updateStarState}
              updateCheckState={updateCheckState}
              checkDisabled={disableChecks && !checkedState[battler.id]}
            />
          ))}
          <CreateVoteForm onSubmit={submitVote} />
        </div>
      ) : null}
    </>
  );
}

export default VoteSubmissionPanel;
