import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      date
      address
      admissionCost
      flyerImageUrl
      league {
        id
        leagueName
      }
      battles {
        id
        battlers {
          id
          name
          score
        }
      }
    }
  }
`;
