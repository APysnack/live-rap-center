import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      crews {
        id
        crewChatId
        name
      }
      battler {
        id
        league {
          id
          leagueName
          logoUrl
        }
      }
    }
  }
`;
