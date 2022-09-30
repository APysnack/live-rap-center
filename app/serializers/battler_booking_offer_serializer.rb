class BattlerBookingOfferSerializer
    include JSONAPI::Serializer
    attributes :id, :amount_offered, :number_of_rounds, :minutes_per_round, :date

    attribute :battler_id do |object|
      object.battler.id
    end

    attribute :booker_user_id do |object|
      object.booker_user_id
    end
  end
  