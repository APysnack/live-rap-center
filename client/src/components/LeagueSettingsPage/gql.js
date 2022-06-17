import { gql } from "@apollo/client";

export const GET_USER_LEAGUE = gql`
  query League($id: ID!) {
    league(id: $id) {
      leagueName
    }
  }
`;
