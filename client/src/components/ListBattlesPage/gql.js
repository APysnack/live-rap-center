import { gql } from "@apollo/client";

export const GET_BATTLES = gql`
  {
    battles {
      id
      battleUrl
      battlers {
        name
      }
    }
  }
`;
