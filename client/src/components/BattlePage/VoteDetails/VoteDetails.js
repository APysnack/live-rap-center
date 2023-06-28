import React, { useState } from 'react';
import {
  VoteDetailsContainer,
  VoteDetailsActionsWrapper,
} from './VoteDetails.styles';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { DELETE_BATTLE_VOTE } from './gql';
import Delete from '@mui/icons-material/Delete';

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
      <div className='vote-detail-container'>{vote.voterName}</div>

      {vote?.scores?.length > 0
        ? vote.scores.map((score) => (
            <div
              className={`vote-detail-container ${
                score.outcome === 'win' ? 'winner' : ''
              }`}
              key={score.id}
            >
              <div className='battler-name'>{score.battlerName}</div>
              <div className='battler-score'>{score.value}</div>
            </div>
          ))
        : null}
      <VoteDetailsContainer>
        <div>{vote.comment}</div>
      </VoteDetailsContainer>
      {userViewingPageIsAdmin ? (
        <Delete className='delete-icon' onClick={deleteVote}>
          DELETE
        </Delete>
      ) : null}
    </VoteDetailsActionsWrapper>
  );
}

export default VoteDetails;
