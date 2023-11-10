import { gql } from '@apollo/client';

export const GET_BATTLE = gql`
  query Battle($id: ID!) {
    battle(id: $id) {
      id
      title
      battleUrl
      thumbnail
      battleStatus
      battleWinner {
        id
      }
      league {
        id
        logoUrl
      }
      battlers {
        id
        name
        image
        score
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
          battlerId
          outcome
        }
      }
    }
  }
`;
