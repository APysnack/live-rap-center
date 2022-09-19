
module Mutations
    class CreateCrewInvitation < BaseMutation
        argument :user_id, ID, required: true
        argument :crew_id, ID, required: true

        type Types::Models::CrewInvitationType

        def resolve(user_id: nil, crew_id: nil)
            unless CrewInvitation.where(user_id: user_id, crew_id: crew_id).exists?
                CrewInvitation.create!(
                    user_id: user_id,
                    crew_id: crew_id
                )
           end
        end
    end
end