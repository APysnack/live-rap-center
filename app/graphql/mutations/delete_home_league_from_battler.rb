module Mutations
    class DeleteHomeLeagueFromBattler < BaseMutation
        argument :battler_id, ID, required: true

        type Types::Models::BattlerType

        def resolve(battler_id: nil)
            battler = Battler.find_by(id: battler_id)
            if battler.league.present?
                league = League.find_by(id: battler.league.id)
                LeagueChatUser.where(user_id: battler.user.id, league_chat_id: league.league_chat_id).destroy_all
                battler.league_id = nil
                battler.save
                battler
            end
        end
    end
end