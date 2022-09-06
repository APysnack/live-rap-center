module Mutations
    class UpdateUserLocation < BaseMutation
        argument :user_id, ID, required: true
        argument :country, String, required: true 
        argument :region, String, required: true

        type Types::Models::UserType

        def resolve(input)
            user = User.find_by(id: input[:user_id])
            if user.present?
                user.location.country = input[:country]
                user.location.region = input[:region]
                user.location.save
                user
            end
        end
    end
end