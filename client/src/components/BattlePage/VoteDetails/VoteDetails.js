import React, { useState } from 'react';
import {
  VoteDetailsContainer,
  VoteDetailsActionsWrapper,
} from './VoteDetails.styles';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { DELETE_BATTLE_VOTE } from './gql';

function VoteDetails({ vote, refetchBattle }) {
  const { user } = useSelector((state) => state.user.userState);
  const [userViewingPageIsAdmin, setUserViewingPageIsAdmin] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const [deleteBattleVote] = useMutation(DELETE_BATTLE_VOTE, {
    onCompleted: (data) => updateFlashMessage(data),
  });

  React.useEffect(() => {
    if (user?.roles?.includes('admin')) {
      setUserViewingPageIsAdmin(true);
    }
  }, []);

  const updateFlashMessage = () => {
    refetchBattle();
    setFlashMessage('vote deleted!');
  };

  const deleteVote = () => {
    deleteBattleVote({
      variables: {
        battleVoteId: vote.id,
      },
    });
  };

  return (
    <VoteDetailsActionsWrapper>
      {flashMessage ? <div>{flashMessage}</div> : null}
      <VoteDetailsContainer>
        <div className='header'>
          <div>vote from {vote.voterName} </div>
          <div>comment: {vote.comment}</div>
        </div>
        {vote?.scores?.length > 0
          ? vote.scores.map((score) => (
              <div key={score.id}>
                {score.battlerName} {score.outcome} {score.value}
              </div>
            ))
          : null}
      </VoteDetailsContainer>
      {userViewingPageIsAdmin ? (
        <div onClick={deleteVote}>DELETE VOTE</div>
      ) : null}
    </VoteDetailsActionsWrapper>
  );
}

export default VoteDetails;
