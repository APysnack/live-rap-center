import { gql } from '@apollo/client';

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(input: { eventId: $eventId }) {
      message
    }
  }
`;
