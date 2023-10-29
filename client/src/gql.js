import { gql } from '@apollo/client';

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      profilePictureUrl
      roles {
        id
        name
      }
      selectedTheme
      location {
        country
        region
      }
      socialMediaLinks {
        id
        socialMediaPlatformName
        url
      }
    }
  }
`;
