module Mutations
  class InitializeUser < BaseMutation
    argument :user_id, ID, required: true
    argument :battler_id, ID, required: false

    type Types::Models::UserType

    def resolve(user_id:, battler_id: nil)
      user = User.find(user_id)
      user.battler = Battler.find(battler_id) if battler_id
      user.update!(is_initialized: true)
      user
    end
  end
end