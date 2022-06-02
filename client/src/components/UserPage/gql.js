import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      username
      email
      battler {
        name
      }
      profilePicture {
        url
      }
    }
  }
`;