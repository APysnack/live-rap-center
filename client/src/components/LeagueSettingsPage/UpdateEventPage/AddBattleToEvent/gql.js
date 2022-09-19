import { gql } from '@apollo/client';

export const GET_ALL_BATTLERS = gql`
  query Battlers {
    battlers {
      battlers {
        id
        name
      }
    }
  }
`;

export const ADD_BATTLE_TO_UPCOMING_EVENT = gql`
  mutation addBattleToUpcomingEvent(
    $eventId: ID!
    $leagueId: ID!
    $battlerIds: [ID!]!
  ) {
    addBattleToUpcomingEvent(
      input: { eventId: $eventId, leagueId: $leagueId, battlerIds: $battlerIds }
    ) {
      id
    }
  }
`;
