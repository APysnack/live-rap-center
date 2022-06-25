import { gql } from "@apollo/client";

export const GET_USER_BATTLER = gql`
  query Battler($userId: ID!) {
    battler(userId: $userId) {
      id
      name
      score
      league {
        leagueName
      }
      potentialLeagues {
        id
        leagueName
      }
      battles {
        battleUrl
      }
    }
  }
`;

export const ADD_HOME_LEAGUE_TO_BATTLER = gql`
  mutation addHomeLeagueToBattler($battlerId: ID!, $leagueId: ID!) {
    addHomeLeagueToBattler(
      input: { battlerId: $battlerId, leagueId: $leagueId }
    ) {
      id
    }
  }
`;

export const DELETE_LEAGUE_INVITATION = gql`
  mutation deleteLeagueInvitation($battlerId: ID!, $leagueId: ID!) {
    deleteLeagueInvitation(
      input: { battlerId: $battlerId, leagueId: $leagueId }
    ) {
      message
    }
  }
`;
