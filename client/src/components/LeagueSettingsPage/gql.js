import { gql } from '@apollo/client';

export const GET_USER_WITH_LEAGUES = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      ownedLeagues {
        id
        leagueName
        logoUrl
        upcomingEvents {
          id
          name
          flyerImageUrl
          date
          address
          admissionCost

          location {
            id
            country
            region
          }
        }
      }
    }
  }
`;
