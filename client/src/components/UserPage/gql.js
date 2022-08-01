import { gql } from "@apollo/client";

export const GET_USER_BATTLER = gql`
  query Battler($userId: ID!) {
    battler(userId: $userId) {
      id
      name
      score
      record {
        wins
        losses
      }
      league {
        id
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

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      profilePictureUrl
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

export const ADD_HOME_LEAGUE_TO_BATTLER = gql`
  mutation addHomeLeagueToBattler($battlerId: ID!, $leagueId: ID!) {
    addHomeLeagueToBattler(
      input: { battlerId: $battlerId, leagueId: $leagueId }
    ) {
      id
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
