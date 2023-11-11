import { gql } from '@apollo/client';

export const GET_USER_BATTLER = gql`
  query Battler($userId: ID!) {
    battler(userId: $userId) {
      id
      name
      score
      totalViews
      averageViews
      battleCount
      record {
        wins
        losses
      }
      league {
        id
        leagueName
        logoUrl
      }
      potentialLeagues {
        id
        leagueName
      }
      battles {
        id
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
      isInitialized
      battlerBookingOffers {
        id
        chatId
        battler {
          username
        }
      }
      potentialCrews {
        id
        name
      }
      socialMediaLinks {
        socialMediaPlatformName
        url
      }
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

export const ADD_CREW_TO_USER = gql`
  mutation addCrewToUser($userId: ID!, $crewId: ID!) {
    addCrewToUser(input: { userId: $userId, crewId: $crewId }) {
      id
    }
  }
`;

export const DELETE_CREW_INVITATION = gql`
  mutation deleteCrewInvitation($userId: ID!, $crewId: ID!) {
    deleteCrewInvitation(input: { userId: $userId, crewId: $crewId }) {
      message
    }
  }
`;

export const GET_ALL_BATTLERS = gql`
  query Battlers($fetchAll: Boolean) {
    battlers(fetchAll: $fetchAll) {
      battlers {
        id
        name
      }
    }
  }
`;

export const INITIALIZE_USER = gql`
  mutation InitializeUser($userId: ID!, $battlerId: ID) {
    initializeUser(input: { userId: $userId, battlerId: $battlerId }) {
      id
    }
  }
`;
