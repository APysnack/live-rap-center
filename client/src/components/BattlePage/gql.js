import { gql } from "@apollo/client";

export const GET_BATTLE = gql`
  query Battle($id: ID!) {
    battle(id: $id) {
      battleUrl
      battlers {
        name
        user {
          username
          isVerified
        }
      }
    }
  }
`;
