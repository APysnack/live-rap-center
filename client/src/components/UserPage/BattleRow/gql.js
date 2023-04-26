import { gql } from '@apollo/client';

export const GET_FOLLOWED_BATTLES = gql`
  query FollowedBattles($userId: ID!, $battleCount: Int!, $dateRange: String!) {
    followedBattles(
      userId: $userId
      battleCount: $battleCount
      dateRange: $dateRange
    ) {
      id
      thumbnail
      battleUrl
      score
      battlers {
        id
        name
      }
      league {
        id
        leagueName
      }
    }
  }
`;

export const GET_TOP_BATTLES = gql`
  query TopBattles($battleCount: Int!, $dateRange: String!) {
    topBattles(battleCount: $battleCount, dateRange: $dateRange) {
      id
      thumbnail
      battleUrl
      score
      battlers {
        id
        name
      }
      league {
        id
        leagueName
      }
    }
  }
`;
