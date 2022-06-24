module Queries
    class Battles < Queries::BaseQuery
      description 'Fetch all battles'
  
      type [Types::Models::BattleType], null: true
  
      def resolve()
        ::Battle.all
      end
    end
end