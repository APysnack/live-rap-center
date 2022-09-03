module Mutations
    class DeleteEvent < BaseMutation
        argument :event_id, ID, required: true

        field :message, String, null: false

        def resolve(input)
            event = Event.find_by(id: input[:event_id])
            unless event.nil?
                event.destroy
                return { message: "event deleted" }
            end 
        end
    end
end