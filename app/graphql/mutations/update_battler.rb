module Mutations
    class UpdateBattler < BaseMutation
        argument :user_id, Integer, required: true
        argument :booking_price, Integer, required: false

        type Types::BattlerType

        def resolve(user_id: nil, booking_price: nil)
            battler = Battler.find_by(user_id: user_id)
            if booking_price.present?
                battler.booking_price = booking_price
                battler.save
            end
            battler
        end
    end
end