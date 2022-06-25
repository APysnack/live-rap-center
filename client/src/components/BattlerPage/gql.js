import { gql } from "@apollo/client";

export const GET_BATTLER = gql`
  query Battler($id: ID!) {
    battler(id: $id) {
      id
      name
      score
      battles {
        battleUrl
      }
      user {
        id
        isVerified
      }
      league {
        leagueName
      }
    }
  }
`;

export const CREATE_LEAGUE_INVITATION = gql`
  mutation CreateLeagueInvitation($leagueId: ID!, $battlerId: ID!) {
    createLeagueInvitation(
      input: { leagueId: $leagueId, battlerId: $battlerId }
    ) {
      id
      leagueId
      battlerId
    }
  }
`;

export const GET_USER_LEAGUE = gql`
  query League($id: ID!) {
    league(id: $id) {
      id
      leagueName
    }
  }
`;
