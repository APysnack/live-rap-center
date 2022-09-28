import { gql } from '@apollo/client';

export const CREATE_BATTLER_BOOKING_OFFER = gql`
  mutation CreateBattlerBookingOffer(
    $battlerId: ID!
    $bookerUserId: ID!
    $numberOfRounds: Int!
    $minutesPerRound: Float!
    $amountOffered: Int!
    $comments: String
    $bookingDate: ISO8601DateTime!
  ) {
    createBattlerBookingOffer(
      input: {
        battlerId: $battlerId
        bookerUserId: $bookerUserId
        numberOfRounds: $numberOfRounds
        minutesPerRound: $minutesPerRound
        amountOffered: $amountOffered
        comments: $comments
        bookingDate: $bookingDate
      }
    ) {
      id
    }
  }
`;
