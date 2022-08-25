module Mutations
    class DeleteBattlerFollow < BaseMutation
        argument :battler_id, ID, required: true
        argument :user_id, ID, required: true

        field :message, String, null: false

        def resolve(battler_id: nil, user_id: nil)
            battler_follow = BattlerFollow.where(battler_id: battler_id, user_id: user_id)
            unless battler_follow.empty?
                battler_follow.each do | follow |
                    follow.destroy
                end
                return { message: "battler follow deleted" }
            end 
        end
    end
end