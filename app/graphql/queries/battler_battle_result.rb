module Queries
    class BattlerBattleResult < Queries::BaseQuery
      description 'Fetch battle result by result id'

      argument :id, ID, required: false
  
      type Types::Models::BattlerBattleResultType, null: true
  
      def resolve(id: nil)
        ::BattlerBattleResult.find_by(id: id)
      end
    end
end