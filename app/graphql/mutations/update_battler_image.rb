module Mutations
    class UpdateBattlerImage < BaseMutation
        argument :name, String, required: false
        argument :battler_id, ID, required: true
        argument :image, ApolloUploadServer::Upload, required: true

        type Types::Models::BattlerType

        def resolve(input)
            battler = Battler.find_by(id: input[:battler_id])
            file = input[:image]

            if battler.present?
                blob = ActiveStorage::Blob.create_and_upload!(
                    io: file,
                    filename: file.original_filename,
                    content_type: file.content_type
                )
                battler.image = blob
                if battler.save
                    return battler
                end
            end
        end
    end
end