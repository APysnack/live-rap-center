module Mutations
    class CreateBattle < BaseMutation
        argument :user_id, ID, required: false
        argument :league_id, ID, required: true
        argument :battle_url, String, required: true

        type Types::BattleType

        def resolve(league_id: nil, battle_url: nil)
            Battle.create!(
                league_id: league_id,
                battle_url: battle_url
            )
        end
    end
end