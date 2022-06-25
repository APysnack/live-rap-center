import { gql } from "@apollo/client";

export const UPDATE_BATTLER = gql`
  mutation updateBattlerBookingPrice(
    $userId: ID!
    $bookingPrice: Int
    $bookingPriceEnabled: Boolean!
  ) {
    updateBattlerBookingPrice(
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
