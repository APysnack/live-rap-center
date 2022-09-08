import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
  query Leagues($searchText: String) {
    leagues(searchText: $searchText) {
      id
      leagueName
      leagueScore
      logoUrl
    }
  }
`;
