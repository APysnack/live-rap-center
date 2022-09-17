import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
  query {
    events {
      id
      name
      admissionCost
      address
      date
      league {
        id
        leagueName
      }
    }
  }
`;
