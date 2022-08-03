import { gql } from "@apollo/client";

export const GET_LEAGUE = gql`
  query League($id: ID!) {
    league(id: $id) {
      id
      leagueName
      leagueUrl
      battlers {
        id
        name
      }
      battles {
        id
        battlers {
          id
          name
        }
      }
    }
  }
`;
