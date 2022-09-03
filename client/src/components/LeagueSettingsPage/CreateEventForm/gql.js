import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $leagueId: ID!
    $name: String!
    $admissionCost: Int!
    $address: String
    $date: ISO8601DateTime!
  ) {
    createEvent(
      input: {
        leagueId: $leagueId
        name: $name
        admissionCost: $admissionCost
        address: $address
        date: $date
      }
    ) {
      id
      name
      address
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $eventId: ID!
    $name: String!
    $admissionCost: Int!
    $address: String
    $date: ISO8601DateTime!
  ) {
    updateEvent(
      input: {
        eventId: $eventId
        name: $name
        admissionCost: $admissionCost
        address: $address
        date: $date
      }
    ) {
      id
      name
      address
    }
  }
`;
