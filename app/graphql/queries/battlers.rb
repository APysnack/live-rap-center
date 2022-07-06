module Queries
    class Battlers < Queries::BaseQuery
      description 'Fetch all battlers'
  
      type [Types::Models::BattlerType], null: true
  
      def resolve()
        ::Battler.all.order('score desc')
      end
    end
end