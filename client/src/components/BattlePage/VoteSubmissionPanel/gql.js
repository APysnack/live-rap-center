import { gql } from "@apollo/client";

export const CREATE_BATTLE_VOTE = gql`
  mutation CreateBattleVote(
    $userId: ID!
    $battleId: ID!
    $comment: String!
    $loserBattlerId: ID!
    $winnerBattlerId: ID!
    $loserBattlerScore: Int!
    $winnerBattlerScore: Int!
  ) {
    createBattleVote(
      input: {
        userId: $userId
        battleId: $battleId
        comment: $comment
        loserBattlerId: $loserBattlerId
        winnerBattlerId: $winnerBattlerId
        loserBattlerScore: $loserBattlerScore
        winnerBattlerScore: $winnerBattlerScore
      }
    ) {
      id
    }
  }
`;
