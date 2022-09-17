module Mutations
    class UpdateEvent < BaseMutation
        argument :event_id, ID, required: true
        argument :admission_cost, Int, required: true
        argument :country, String, required: true 
        argument :region, String, required: true
        argument :address, String, required: false
        argument :name, String, required: true 
        argument :date, GraphQL::Types::ISO8601DateTime, required: false

        type Types::Models::EventType

        def resolve(input)
            event = Event.find_by(id: input[:event_id])
            if event.present?
                event.admission_cost = input[:admission_cost]
                event.address = input[:address]
                event.name = input[:name]
                event.date = input[:date]
                event.location.region = input[:region]
                event.location.country = input[:country]
                event.location.save
                event.save
                return event
            end
        end
    end
end