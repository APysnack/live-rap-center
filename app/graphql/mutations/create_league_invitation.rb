module Mutations
    class CreateLeagueInvitation < BaseMutation
        argument :battler_id, ID, required: true
        argument :league_id, ID, required: true

        type Types::Models::LeagueInvitationType

        def resolve(battler_id: nil, league_id: nil)
            unless LeagueInvitation.where(battler_id: battler_id, league_id: league_id).exists?
                LeagueInvitation.create!(
                    battler_id: battler_id,
                    league_id: league_id
                )
           end
        end
    end
end