import { gql } from '@apollo/client';

export const CREATE_CREW = gql`
  mutation CreateCrew($crewName: String!, $userId: ID!) {
    createCrew(input: { crewName: $crewName, userId: $userId }) {
      id
      name
    }
  }
`;
