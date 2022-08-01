module Queries
    class BattlerBattleResults < Queries::BaseQuery
      description 'Fetch all battle results'
  
      type [Types::Models::BattlerBattleResultType], null: true
  
      def resolve()
        ::BattlerBattleResult.all
      end
    end
end