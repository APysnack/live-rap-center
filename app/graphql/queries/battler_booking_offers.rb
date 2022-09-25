module Queries
    class BattlerBookingOffers < Queries::BaseQuery
      description 'Fetch all battler booking offers'
  
      type [Types::Models::BattlerBookingOfferType], null: true
  
      def resolve()
        ::BattlerBookingOffer.all
      end
    end
end