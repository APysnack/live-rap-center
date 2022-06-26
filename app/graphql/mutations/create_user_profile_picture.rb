module Mutations
    class CreateUserProfilePicture < BaseMutation
        argument :user_id, ID, required: true
        argument :image, ApolloUploadServer::Upload, required: true

        type Types::Models::UserType

        def resolve(input)
            user = User.find_by(id: input[:user_id])

            if user.present?
                file = input[:image]
                blob = ActiveStorage::Blob.create_and_upload!(
                    io: file,
                    filename: file.original_filename,
                    content_type: file.content_type
                )
                user.image = blob
                if user.save
                    return user
                end
            end
        end
    end
end