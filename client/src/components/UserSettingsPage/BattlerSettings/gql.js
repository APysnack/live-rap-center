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

export const DELETE_HOME_LEAGUE_FROM_BATTLER = gql`
  mutation deleteHomeLeagueFromBattler($battlerId: ID!) {
    deleteHomeLeagueFromBattler(input: { battlerId: $battlerId }) {
      id
    }
  }
`;
