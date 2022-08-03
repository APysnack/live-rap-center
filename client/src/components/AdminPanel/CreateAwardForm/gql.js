import { gql } from '@apollo/client';

export const GET_AWARDS = gql`
  {
    awards {
      id
      name
      imageUrl
    }
  }
`;
