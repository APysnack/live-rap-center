import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
  query Events($country: String, $region: String) {
    events(country: $country, region: $region) {
      id
      name
      address
      date
      flyerImageUrl
      league {
        id
        leagueName
      }
    }
  }
`;
