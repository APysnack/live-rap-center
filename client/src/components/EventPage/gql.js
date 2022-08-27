import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
  query {
    events {
      id
      name
      admissionCost
      address
      league {
        id
        leagueName
      }
      battles {
        id
        battlers {
          id
          name
        }
      }
    }
  }
`;
