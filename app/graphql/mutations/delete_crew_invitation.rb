module Mutations
    class DeleteCrewInvitation < BaseMutation
        argument :user_id, ID, required: true
        argument :crew_id, ID, required: true

        field :message, String, null: false

        def resolve(user_id: nil, crew_id: nil)
            invitations = CrewInvitation.where(user_id: user_id, crew_id: crew_id)
            unless invitations.empty?
                invitations.each do | invitation |
                    invitation.destroy
                end
                return { message: "league invitation deleted" }
            end 
        end
    end
end