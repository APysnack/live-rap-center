import { gql } from '@apollo/client';

export const GET_BATTLES = gql`
  query Battles(
    $searchText: String
    $rowsToFetch: Int!
    $firstPageToFetch: Int!
  ) {
    battles(
      searchText: $searchText
      rowsToFetch: $rowsToFetch
      firstPageToFetch: $firstPageToFetch
    ) {
      battles {
        id
        title
        thumbnail
        battleUrl
        score
        leagueName
        battlers {
          id
          name
        }
      }
      tableRowCount
    }
  }
`;
