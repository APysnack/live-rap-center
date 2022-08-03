import { gql } from "@apollo/client";

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($leagueName: String!, $leagueUrl: String!) {
    createLeague(input: { leagueName: $leagueName, leagueUrl: $leagueUrl }) {
      id
      leagueName
    }
  }
`;
