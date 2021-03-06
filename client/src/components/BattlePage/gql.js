import { gql } from "@apollo/client";

export const GET_BATTLE = gql`
  query Battle($id: ID!) {
    battle(id: $id) {
      id
      battleUrl
      thumbnail
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
