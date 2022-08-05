import { gql } from '@apollo/client';

export const GET_AWARDS = gql`
  {
    awards {
      id
      name
      imageUrl
      awardType
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

export const UPDATE_AWARD = gql`
  mutation UpdateAward(
    $awardId: ID!
    $awardName: String!
    $awardType: AwardTypeEnum!
  ) {
    updateAward(
      input: { awardId: $awardId, awardName: $awardName, awardType: $awardType }
    ) {
      id
      name
      awardType
    }
  }
`;
