module Mutations
    class CreateEvent < BaseMutation
        argument :league_id, ID, required: true
        argument :admission_cost, Int, required: true
        argument :address, String, required: false
        argument :name, String, required: true 
        argument :date, GraphQL::Types::ISO8601DateTime, required: false

        type Types::Models::EventType

        def resolve(input)
            event = Event.create!(
                league_id: input[:league_id], 
                admission_cost: input[:admission_cost],
                address: input[:address], 
                name: input[:name],
                date: Time.now + 7.days
            )
            return event
        end
    end
end