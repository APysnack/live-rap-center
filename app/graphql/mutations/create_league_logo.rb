module Mutations
    class CreateLeagueLogo < BaseMutation
        argument :name, String, required: false
        argument :league_id, ID, required: true
        argument :image, ApolloUploadServer::Upload, required: true

        type Types::Models::LeagueType

        def resolve(input)
            league = League.find_by(id: input[:league_id])
            file = input[:image]

            if league.present?
                blob = ActiveStorage::Blob.create_and_upload!(
                    io: file,
                    filename: file.original_filename,
                    content_type: file.content_type
                )
                league.image = blob
                if league.save
                    return league
                end
            end
        end
    end
end