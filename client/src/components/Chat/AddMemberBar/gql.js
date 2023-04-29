import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      username
    }
  }
`;

export const CREATE_CREW_INVITATION = gql`
  mutation CreateCrewInvitation($userId: ID!, $crewId: ID!) {
    createCrewInvitation(input: { userId: $userId, crewId: $crewId }) {
      id
      userId
      crewId
    }
  }
`;
