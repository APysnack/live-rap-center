import { gql } from '@apollo/client';

export const GET_ALL_BATTLERS = gql`
  query (
    $rowsToFetch: Int
    $searchText: String
    $firstPageToFetch: Int
    $leagueId: ID
    $ids: [ID!]
  ) {
    battlers(
      rowsToFetch: $rowsToFetch
      firstPageToFetch: $firstPageToFetch
      ids: $ids
      leagueId: $leagueId
      searchText: $searchText
    ) {
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

export const GET_USER_WITH_LEAGUES = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      ownedLeagues {
        id
        leagueName
        logoUrl
        upcomingEvents {
          id
          name
          flyerImageUrl
          date
          address
          admissionCost

          location {
            id
            country
            region
          }
        }
      }
    }
  }
`;
