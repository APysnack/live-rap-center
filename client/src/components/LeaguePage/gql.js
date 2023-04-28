import { gql } from '@apollo/client';

export const GET_LEAGUE = gql`
  query League($id: ID!) {
    league(id: $id) {
      id
      leagueName
      leagueUrl
      leagueScore
      logoUrl
      battlers {
        id
        name
        score
      }
      upcomingEvents {
        id
        name
        date
        flyerImageUrl
        address
        admissionCost
      }
    }
  }
`;

export const GET_BATTLES = gql`
  query Battles($leagueId: ID, $rowsToFetch: Int, $firstPageToFetch: Int!) {
    battles(
      leagueId: $leagueId
      rowsToFetch: $rowsToFetch
      firstPageToFetch: $firstPageToFetch
    ) {
      battles {
        id
        thumbnail
        battleUrl
        score
        battlers {
          id
          name
        }
        league {
          id
          leagueName
        }
      }
    }
  }
`;
