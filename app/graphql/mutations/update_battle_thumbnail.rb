module Mutations
    class UpdateBattleThumbnail < BaseMutation
        argument :name, String, required: false
        argument :battle_id, ID, required: true
        argument :image, ApolloUploadServer::Upload, required: true

        type Types::Models::BattleType

        def resolve(input)
            battle = Battle.find_by(id: input[:battle_id])
            file = input[:image]

            if battle.present?
                blob = ActiveStorage::Blob.create_and_upload!(
                    io: file,
                    filename: file.original_filename,
                    content_type: file.content_type
                )
                battle.thumbnail = blob
                if battle.save
                    return battle
                end
            end
        end
    end
end