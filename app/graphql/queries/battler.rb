module Queries
    class Battler < Queries::BaseQuery
      description 'Fetch battler by battler id or user id'

      argument :id, ID, required: false
      argument :user_id, ID, required: false
  
      type Types::Models::BattlerType, null: true
  
      def resolve(id: nil, user_id: nil)
        if user_id.present?
            ::Battler.find_by(user_id: user_id)
        else
            ::Battler.find_by(id: id)
        end
      end
    end
end