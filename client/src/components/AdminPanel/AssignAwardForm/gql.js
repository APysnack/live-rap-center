import { gql } from '@apollo/client';

export const GET_AWARDS = gql`
  {
    awards {
      id
      name
    }
  }
`;

export const ASSIGN_AWARD = gql`
  mutation assignAward($awardId: ID!, $recipientId: ID!) {
    assignAward(input: { awardId: $awardId, recipientId: $recipientId }) {
      id
    }
  }
`;
