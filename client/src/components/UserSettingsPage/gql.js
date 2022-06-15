import { gql } from "@apollo/client";

export const GET_BATTLER = gql`
  query Battler($id: ID!) {
    battler(id: $id) {
      name
      bookingPrice
      bookingPriceEnabled
    }
  }
`;
