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

export const DELETE_AWARD = gql`
  mutation deleteAward($awardId: ID!) {
    deleteAward(input: { awardId: $awardId }) {
      message
    }
  }
`;
