import { gql } from "@apollo/client";

export const UPDATE_BATTLER = gql`
  mutation updateBattler($userId: Int!, $bookingPrice: Int) {
    updateBattler(input: { userId: $userId, bookingPrice: $bookingPrice }) {
      id
      name
      bookingPrice
    }
  }
`;
