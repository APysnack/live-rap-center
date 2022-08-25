module Mutations
    class CreateBattlerFollow < BaseMutation
        argument :battler_id, ID, required: true
        argument :user_id, ID, required: true

        type Types::Models::BattlerFollowType

        def resolve(user_id: nil, battler_id: nil)
            unless BattlerFollow.where(battler_id: battler_id, user_id: user_id).exists?
                BattlerFollow.create!(
                    battler_id: battler_id,
                    user_id: user_id
                )
           end
        end
    end
end