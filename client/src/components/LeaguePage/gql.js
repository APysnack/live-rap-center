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
      battles {
        id
        battlers {
          id
          name
        }
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
