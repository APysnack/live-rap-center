import { gql } from '@apollo/client';

export const GET_ALL_BATTLERS = gql`
  query Battlers($fetchAll: Boolean, $ids: [ID!]) {
    battlers(fetchAll: $fetchAll, ids: $ids) {
      battlers {
        id
        name
        image
        totalViews
        averageViews
        medianViews
        averageLeagueZscore
        score
        user {
          id
          username
          isVerified
        }
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
