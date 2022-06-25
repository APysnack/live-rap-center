module Mutations
    class DeleteHomeLeagueFromBattler < BaseMutation
        argument :battler_id, ID, required: true

        type Types::Models::BattlerType

        def resolve(battler_id: nil)
            battler = Battler.find_by(id: battler_id)
            if battler.present?
                battler.league_id = nil
                battler.save
                battler
            end
        end
    end
end