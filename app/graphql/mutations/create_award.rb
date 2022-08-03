module Mutations
    class CreateAward < BaseMutation
        argument :name, String, required: true
        argument :image, ApolloUploadServer::Upload, required: true

        type Types::Models::AwardType

        def resolve(input)
            file = input[:image]
            blob = ActiveStorage::Blob.create_and_upload!(
                io: file,
                filename: file.original_filename,
                content_type: file.content_type
            )

            award = Award.create(name: input[:name])
            award.image = blob
            if award.save
                return award
            end
        end
    end
end