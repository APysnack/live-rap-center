import { gql } from "@apollo/client";

export const GET_LEAGUES = gql`
  {
    leagues {
      id
      leagueName
      logoUrl
    }
  }
`;
