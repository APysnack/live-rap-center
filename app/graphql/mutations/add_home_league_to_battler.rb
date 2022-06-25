module Mutations
    class AddHomeLeagueToBattler < BaseMutation
        argument :league_id, ID, required: true
        argument :battler_id, ID, required: true

        type Types::Models::BattlerType

        def resolve(league_id: nil, battler_id: nil)
            battler = Battler.find_by(id: battler_id)
            invitation = LeagueInvitation.find_by(battler_id: battler_id, league_id: league_id)
            if invitation.present? && battler.present?
                invitation.destroy
                battler.league_id = league_id
                battler.save
                battler
            end
        end
    end
end