import { gql } from '@apollo/client';

export const GET_BATTLERS = gql`
  query Battlers(
    $searchText: String
    $rowsToFetch: Int!
    $firstPageToFetch: Int!
  ) {
    battlers(
      searchText: $searchText
      rowsToFetch: $rowsToFetch
      firstPageToFetch: $firstPageToFetch
    ) {
      battlers {
        id
        image
        name
        score
        region
        user {
          id
          profilePictureUrl
        }
      }
      tableRowCount
    }
  }
`;
