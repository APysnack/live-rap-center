module Queries
    class Battles < Queries::BaseQuery
      description 'Fetch all battles (excludes prospective battles that havent occurred)'
  
      type [Types::Models::BattleType], null: true
  
      def resolve()
        ::Battle.where.not(battle_status: :prospective).order('score DESC')
      end
    end
end