import { gql } from "@apollo/client";

export const UPDATE_LEAGUE_SETTINGS = gql`
  mutation UpdateLeagueSettings($leagueId: ID!, $leagueName: String!) {
    updateLeagueSettings(
      input: { leagueId: $leagueId, leagueName: $leagueName }
    ) {
      id
      leagueName
    }
  }
`;
