import { gql } from "@apollo/client";

export const GET_BATTLES = gql`
  {
    battles {
      id
      thumbnail
      battleUrl
      battlers {
        id
        name
      }
    }
  }
`;
