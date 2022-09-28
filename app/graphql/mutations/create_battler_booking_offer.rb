module Mutations
    class CreateBattlerBookingOffer < BaseMutation
        argument :battler_id, ID, required: true
        argument :booker_user_id, ID, required: true
        argument :number_of_rounds, Integer, required: true
        argument :minutes_per_round, Float, required: true
        argument :amount_offered, Integer, required: true
        argument :comments, String, required: false
        argument :booking_date, GraphQL::Types::ISO8601DateTime, required: false

        type Types::Models::BattlerBookingOfferType

        def resolve(input)
            battler_user = Battler.find_by(id: input[:battler_id])
            if battler_user.present?
                BattlerBookingOffer.create(battler_user_id: battler_user.id, booker_user_id: input[:booker_user_id], 
                    number_of_rounds: input[:number_of_rounds], minutes_per_round: input[:minutes_per_round], 
                    amount_offered: input[:amount_offered], comments: input[:comments], date: input[:booking_date])
            end
        
        end
    end
end