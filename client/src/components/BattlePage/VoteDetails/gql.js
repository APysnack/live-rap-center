import { gql } from '@apollo/client';

export const DELETE_BATTLE_VOTE = gql`
  mutation deleteBattleVote($battleVoteId: ID!) {
    deleteBattleVote(input: { battleVoteId: $battleVoteId }) {
      message
    }
  }
`;
