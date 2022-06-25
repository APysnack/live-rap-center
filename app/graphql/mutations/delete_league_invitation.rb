module Mutations
    class DeleteLeagueInvitation < BaseMutation
        argument :battler_id, ID, required: true
        argument :league_id, ID, required: true

        field :message, String, null: false

        def resolve(battler_id: nil, league_id: nil)
            invitations = LeagueInvitation.where(battler_id: battler_id, league_id: league_id)
            unless invitations.empty?
                invitations.each do | invitation |
                    invitation.destroy
                end
                return { message: "league invitation deleted" }
            end 
        end
    end
end