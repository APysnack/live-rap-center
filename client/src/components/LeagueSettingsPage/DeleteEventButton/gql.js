import { gql } from '@apollo/client';

export const DELETE_EVENT = gql`
  mutation deleteAward($eventId: ID!) {
    deleteAward(input: { eventId: $eventId }) {
      message
    }
  }
`;
