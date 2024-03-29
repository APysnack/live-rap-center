import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      address
      admissionCost
      flyerImageUrl
      date
      location {
        country
        region
      }
      league {
        id
      }
      battles {
        id
        battlers {
          name
        }
      }
    }
  }
`;
