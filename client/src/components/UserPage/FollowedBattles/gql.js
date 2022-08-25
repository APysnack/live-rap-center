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
    }
  }
`;
