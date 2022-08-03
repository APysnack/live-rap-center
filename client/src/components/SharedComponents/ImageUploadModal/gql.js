import { gql } from '@apollo/client';

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

export const UPDATE_BATTLER_IMAGE = gql`
  mutation UpdateBattlerImage($name: String, $battlerId: ID!, $image: Upload!) {
    updateBattlerImage(
      input: { name: $name, battlerId: $battlerId, image: $image }
    ) {
      id
      name
      image
    }
  }
`;

export const CREATE_AWARD = gql`
  mutation CreateAward($name: String!, $image: Upload!) {
    createAward(input: { name: $name, image: $image }) {
      id
      name
      imageUrl
    }
  }
`;
