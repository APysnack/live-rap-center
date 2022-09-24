module Mutations
    class UpdateSelectedTheme < BaseMutation
        # Custom object defined in base_input_object.rb
        argument :user_id, ID, required: true
        argument :theme_name, String, required: true

        type Types::Models::UserType

        def resolve(user_id: nil, theme_name: nil)
            user = User.find_by(id: user_id)
            if user.present?
                user.selected_theme = theme_name
                if user.save
                    return user
                end
            end
        end

    end
end