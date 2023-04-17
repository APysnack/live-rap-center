import { gql } from '@apollo/client';

export const GET_BATTLER = gql`
  query Battler($id: ID!) {
    battler(id: $id) {
      id
      name
      score
      image
      bookingPrice
      battleCount
      record {
        wins
        losses
      }
      battles {
        id
        thumbnail
        battleUrl
        score
        battlers {
          id
          name
        }
        leagueName
      }
      user {
        id
        isVerified
        profilePictureUrl
        socialMediaLinks {
          id
          socialMediaPlatformName
          url
        }
      }
      league {
        id
        leagueName
      }
    }
  }
`;

export const CREATE_LEAGUE_INVITATION = gql`
  mutation CreateLeagueInvitation($leagueId: ID!, $battlerId: ID!) {
    createLeagueInvitation(
      input: { leagueId: $leagueId, battlerId: $battlerId }
    ) {
      id
      leagueId
      battlerId
    }
  }
`;

export const CREATE_BATTLER_FOLLOW = gql`
  mutation createBattlerFollow($userId: ID!, $battlerId: ID!) {
    createBattlerFollow(input: { userId: $userId, battlerId: $battlerId }) {
      id
    }
  }
`;

export const DELETE_BATTLER_FOLLOW = gql`
  mutation deleteBattlerFollow($userId: ID!, $battlerId: ID!) {
    deleteBattlerFollow(input: { userId: $userId, battlerId: $battlerId }) {
      message
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      followedBattlerIds
      ownedLeagues {
        id
        leagueName
      }
    }
  }
`;
