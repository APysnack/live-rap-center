import { gql } from "@apollo/client";

export const GET_BATTLE = gql`
  query Battle($id: ID!) {
    battle(id: $id) {
      id
      battleUrl
      thumbnail
      battlers {
        id
        name
        user {
          id
          username
          isVerified
        }
      }
      battleVotes {
        id
        comment
        voterName
        scores {
          battlerName
          outcome
        }
      }
    }
  }
`;
