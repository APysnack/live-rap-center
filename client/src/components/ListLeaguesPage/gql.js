import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
  query Leagues(
    $searchText: String
    $rowsToFetch: Int!
    $firstPageToFetch: Int!
  ) {
    leagues(
      searchText: $searchText
      rowsToFetch: $rowsToFetch
      firstPageToFetch: $firstPageToFetch
    ) {
      leagues {
        id
        leagueName
        leagueScore
        logoUrl
      }
      tableRowCount
    }
  }
`;
