module Mutations
    class AddBattleToUpcomingEvent < BaseMutation
        argument :event_id, ID, required: true
        argument :league_id, ID, required: true
        argument :battler_ids, [ID], required: true

        type Types::Models::BattleType

        def resolve(league_id: nil, event_id: nil, battler_ids: nil)
            battle = Battle.create(league_id: league_id, event_id: event_id, battle_status: :prospective)
            battler_ids.each do |battler_id|
                BattlerBattle.create(battle_id: battle.id, battler_id: battler_id)
            end
            return battle
        end
    end
end