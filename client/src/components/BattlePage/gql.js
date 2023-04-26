import { gql } from '@apollo/client';

export const GET_BATTLE = gql`
  query Battle($id: ID!) {
    battle(id: $id) {
      id
      battleUrl
      thumbnail
      battleStatus
      league {
        id
        logoUrl
      }
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
        voterId
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
