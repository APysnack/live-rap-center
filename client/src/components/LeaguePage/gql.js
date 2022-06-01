import { gql } from "@apollo/client";

export const GET_LEAGUE = gql`
  query League($id: ID!) {
    league(id: $id) {
      leagueName
      leagueUrl
      battlers {
        name
      }
      battles {
        battlers {
          name
        }
      }
    }
  }
`;
