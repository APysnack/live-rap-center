import { gql } from "@apollo/client";

export const GET_USER_BATTLER = gql`
  query Battler($userId: ID!) {
    battler(userId: $userId) {
      league {
        leagueName
      }
    }
  }
`;

export const REMOVE_HOME_LEAGUE = gql`
  mutation deleteHomeLeague($userId: Int!) {
    deleteHomeLeague(input: { userId: $userId }) {
      id
      name
    }
  }
`;
