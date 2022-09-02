module Mutations
    class CreateEventFlyerImage < BaseMutation
        argument :name, String, required: false
        argument :event_id, ID, required: true
        argument :image, ApolloUploadServer::Upload, required: true

        type Types::Models::EventType

        def resolve(input)
            event = Event.find_by(id: input[:event_id])
            file = input[:image]

            if event.present?
                blob = ActiveStorage::Blob.create_and_upload!(
                    io: file,
                    filename: file.original_filename,
                    content_type: file.content_type
                )
                event.flyer_image = blob
                if event.save
                    return event
                end
            end
        end
    end
end