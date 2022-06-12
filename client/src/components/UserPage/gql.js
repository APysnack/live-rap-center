import { gql } from "@apollo/client";

export const GET_USER_BATTLER = gql`
  query Battler($userId: ID!) {
    battler(userId: $userId) {
      score
      league {
        leagueName
      }
      battles {
        battleUrl
      }
    }
  }
`;
