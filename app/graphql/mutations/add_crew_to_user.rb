module Mutations
    class AddCrewToUser < BaseMutation
        argument :crew_id, ID, required: true
        argument :user_id, ID, required: true

        type Types::Models::UserType

        def resolve(crew_id: nil, user_id: nil)
            user = User.find_by(id: user_id)
            if user.present?
                invitations = CrewInvitation.where(user_id: user_id, crew_id: crew_id)
                invitations.each do | invitation |
                    invitation.destroy
                end
                crew = Crew.find_by(id: crew_id)
                
                CrewUser.create(crew_id: crew_id, user_id: user_id)
                CrewChatUser.create(crew_chat_id: crew.crew_chat_id, user_id: user_id)
                user.save
                user
            end
        end
    end
end