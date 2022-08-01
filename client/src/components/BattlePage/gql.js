import { gql } from "@apollo/client";

export const GET_BATTLE = gql`
  query Battle($id: ID!) {
    battle(id: $id) {
      id
      battleUrl
      thumbnail
      votingStatus
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
          id
          value
          battlerName
          outcome
        }
      }
    }
  }
`;
