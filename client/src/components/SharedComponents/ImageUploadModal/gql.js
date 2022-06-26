import { gql } from "@apollo/client";

export const CREATE_LEAGUE_LOGO = gql`
  mutation CreateLeagueLogo($name: String, $leagueId: ID!, $image: Upload!) {
    createLeagueLogo(
      input: { name: $name, leagueId: $leagueId, image: $image }
    ) {
      id
      leagueName
      logoUrl
    }
  }
`;
