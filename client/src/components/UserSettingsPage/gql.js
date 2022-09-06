import { gql } from '@apollo/client';

export const GET_BATTLER = gql`
  query Battler($id: ID!) {
    battler(id: $id) {
      id
      name
      bookingPrice
      bookingPriceEnabled
      league {
        leagueName
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
