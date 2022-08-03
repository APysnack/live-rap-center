import { gql } from "@apollo/client";

export const GET_ALL_SOCIAL_PLATFORMS = gql`
  {
    socialMediaPlatforms {
      id
      name
    }
  }
`;

export const UPDATE_SOCIALS = gql`
  mutation updateSocialMediaLinks(
    $userId: ID!
    $attributes: [SocialMediaLinkAttributes!]!
  ) {
    updateSocialMediaLinks(
      input: { userId: $userId, attributes: $attributes }
    ) {
      id
      socialMediaPlatformId
      socialMediaPlatformName
      url
    }
  }
`;
