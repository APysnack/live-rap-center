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
