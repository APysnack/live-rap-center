module Mutations
    class CreateEvent < BaseMutation
        argument :league_id, ID, required: true
        argument :country, String, required: true 
        argument :region, String, required: true
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
                date: input[:date],
            )

            Location.create(event_id: event.id, country: input[:country], region: input[:region])
            return event
        end
    end
end