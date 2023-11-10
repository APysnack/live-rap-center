import { gql } from '@apollo/client';

export const UPDATE_ALL_BATTLER_STATS = gql`
  mutation updateAllBattlerStats {
    updateAllBattlerStats(input: {}) {
      message
    }
  }
`;
