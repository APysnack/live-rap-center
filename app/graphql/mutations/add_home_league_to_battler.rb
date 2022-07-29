module Mutations
    class AddHomeLeagueToBattler < BaseMutation
        argument :league_id, ID, required: true
        argument :battler_id, ID, required: true

        type Types::Models::BattlerType

        def resolve(league_id: nil, battler_id: nil)
            battler = Battler.find_by(id: battler_id)
            if battler.present?
                invitations = LeagueInvitation.where(battler_id: battler_id)
                invitations.each do | invitation |
                    invitation.destroy
                end
                league = League.find_by(id: league_id)
                LeagueChatUser.create(user_id: battler.user.id, league_chat_id: league.league_chat_id)
                battler.league_id = league_id
                battler.save
                battler
            end
        end
    end
end