import { gql } from "@apollo/client";

export const CREATE_BATTLE = gql`
  mutation CreateBattle($leagueId: ID!, $battleUrl: String!) {
    createBattle(input: { leagueId: $leagueId, battleUrl: $battleUrl }) {
      id
      battleUrl
    }
  }
`;
