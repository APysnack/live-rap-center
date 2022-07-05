import { gql } from "@apollo/client";

export const CREATE_LEAGUE_LOGO = gql`
  mutation CreateLeagueLogo($name: String, $leagueId: ID!, $image: Upload!) {
    createLeagueLogo(
      input: { name: $name, leagueId: $leagueId, image: $image }
    ) {
      id
      leagueName
      logoUrl
    }
  }
`;

export const CREATE_USER_PROFILE_PICTURE = gql`
  mutation CreateUserProfilePicture($userId: ID!, $image: Upload!) {
    createUserProfilePicture(input: { userId: $userId, image: $image }) {
      id
      username
      profilePictureUrl
    }
  }
`;

export const UPDATE_BATTLE_THUMBNAIL = gql`
  mutation UpdateBattleThumbnail(
    $name: String
    $battleId: ID!
    $image: Upload!
  ) {
    updateBattleThumbnail(
      input: { name: $name, battleId: $battleId, image: $image }
    ) {
      id
      battleUrl
      thumbnail
    }
  }
`;
