import { gql } from '@apollo/client';

export const GET_BATTLERS = gql`
  query Battlers($searchText: String) {
    battlers(searchText: $searchText) {
      id
      image
      name
      score
      region
      user {
        id
        profilePictureUrl
      }
    }
  }
`;
