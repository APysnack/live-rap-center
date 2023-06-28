import React, { useEffect, useState } from 'react';
import CreateVoteForm from './CreateVoteForm/CreateVoteForm';
import StarSelector from './StarSelector/StarSelector';
import { useMutation } from '@apollo/client';
import { CREATE_BATTLE_VOTE } from './gql';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import { VotePanelContainer } from './VoteSubmissionPanel.styles';
import _ from 'lodash';

function VoteSubmissionPanel({ user, battle, refetchBattle }) {
  const [createBattleVote, { data, loading, error }] =
    useMutation(CREATE_BATTLE_VOTE);

  const [starState, setStarState] = useState({});
  const [checkedState, setCheckedState] = useState({});
  const [disableChecks, setDisableChecks] = useState(false);

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
    let winnerIds = Object.keys(checkedState).filter(
      (key) => checkedState[key]
    );
    let loserIds = Object.keys(checkedState).filter(
      (key) => !checkedState[key]
    );
    let loserId = parseInt(loserIds[0]);
    let winnerId = parseInt(winnerIds[0]);
    createBattleVote({
      variables: {
        userId: user.id,
        battleId: battle.id,
        loserBattlerId: loserId,
        winnerBattlerId: winnerId,
        loserBattlerScore: sumValues(starState[loserId]),
        winnerBattlerScore: sumValues(starState[winnerId]),
        comment: formData.comment,
      },
      onCompleted: refetchBattle,
    });
  };

  // adds all values in the object
  const sumValues = (obj) => {
    return Object.values(obj).reduce((prev, current) => prev + current, 0);
  };

  // tracks the star ratings for each battler
  const updateStarState = (battlerId, value, metric) => {
    var newState = {};
    const oldState = _.cloneDeep(starState);
    const tempObj = { [battlerId]: { [metric]: value } };
    if (oldState[battlerId]) {
      newState[battlerId] = { ...oldState[battlerId], ...tempObj[battlerId] };
    } else {
      newState = tempObj;
    }
    setStarState({ ...starState, ...newState });
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
        <ContentContainer width={1615}>
          <VotePanelContainer>
            <div className='star-selector-container'>
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
          </VotePanelContainer>
        </ContentContainer>
      ) : null}
    </>
  );
}

export default VoteSubmissionPanel;
