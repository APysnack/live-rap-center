import { gql } from '@apollo/client';

export const UPDATE_USER_LOCATION = gql`
  mutation UpdateUserLocation(
    $userId: ID!
    $country: String!
    $region: String!
  ) {
    updateUserLocation(
      input: { userId: $userId, country: $country, region: $region }
    ) {
      id
    }
  }
`;
