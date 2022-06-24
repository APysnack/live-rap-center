module Mutations
    class DeleteHomeLeague < BaseMutation
        argument :user_id, Integer, required: true

        type Types::Models::BattlerType

        def resolve(user_id: nil)
            user = User.find_by(id: user_id)
            if user.present? && user.battler && user.battler.league_id.present?
                user.battler.league_id = nil
                user.battler.save
            end
            user.battler
        end
    end
end