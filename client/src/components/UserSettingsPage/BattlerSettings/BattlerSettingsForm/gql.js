import { gql } from "@apollo/client";

export const UPDATE_BATTLER = gql`
  mutation updateBattler(
    $userId: Int!
    $bookingPrice: Int
    $bookingPriceEnabled: Boolean!
  ) {
    updateBattler(
      input: {
        userId: $userId
        bookingPrice: $bookingPrice
        bookingPriceEnabled: $bookingPriceEnabled
      }
    ) {
      id
      name
      bookingPrice
      bookingPriceEnabled
    }
  }
`;
