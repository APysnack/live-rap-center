import { gql } from "@apollo/client";

export const GET_TOP_BATTLES = gql`
  query TopBattles($battleCount: Int!, $dateRange: String!) {
    topBattles(battleCount: $battleCount, dateRange: $dateRange) {
      id
      thumbnail
      battleUrl
      score
      battlers {
        id
        name
      }
    }
  }
`;
