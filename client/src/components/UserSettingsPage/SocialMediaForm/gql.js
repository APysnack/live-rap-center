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
    $userId: Int!
    $attributes: [SocialMediaLinkAttributes!]!
  ) {
    updateSocialMediaLinks(
      input: { userId: $userId, attributes: $attributes }
    ) {
      socialMediaPlatformId
      socialMediaPlatformName
      url
    }
  }
`;
