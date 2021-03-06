import { gql } from "@apollo/client";

export const GET_BATTLERS = gql`
  {
    battlers {
      id
      image
      name
      score
      user {
        profilePictureUrl
      }
    }
  }
`;
