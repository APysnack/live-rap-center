import { gql } from '@apollo/client';

export const GET_BATTLES = gql`
  query Battles($searchText: String) {
    battles(searchText: $searchText) {
      id
      thumbnail
      battleUrl
      score
      leagueName
      battlers {
        id
        name
      }
    }
  }
`;
