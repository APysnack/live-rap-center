module Mutations
    class CreateCrew < BaseMutation
        argument :user_id, ID, required: false
        argument :crew_name, String, required: true

        type Types::Models::CrewType

        def resolve(crew_name: nil, user_id: nil)
            crew = Crew.create!(
                name: crew_name,
                user_id: user_id,
            )
            crew_chat = CrewChat.create!(crew_id: crew.id)
            CrewChatUser.create(crew_chat_id: crew_chat.id, user_id: user_id)
            CrewUser.create(crew_id: crew_chat.id, user_id: user_id)
            return crew
        end
    end
end