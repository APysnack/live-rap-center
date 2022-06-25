module Mutations
    class UpdateBattlerBookingPrice < BaseMutation
        argument :user_id, ID, required: true
        argument :booking_price, Integer, required: false
        argument :booking_price_enabled, Boolean, required: true

        type Types::Models::BattlerType

        def resolve(user_id: nil, booking_price: nil, booking_price_enabled: nil)
            battler = Battler.find_by(user_id: user_id)
            if booking_price.present?
                battler.booking_price = booking_price
                battler.booking_price_enabled = true
            else
                battler.booking_price_enabled = booking_price_enabled
            end
            battler.save
            battler
        end
    end
end