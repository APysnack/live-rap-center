import { gql } from '@apollo/client';

export const GET_CREW = gql`
  query Crew($id: ID!) {
    crew(id: $id) {
      id
      crewChatUsers {
        id
        username
      }
    }
  }
`;
