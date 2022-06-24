module Queries
    class Battlers < Queries::BaseQuery
      description 'Fetch all battlers'
  
      type [Types::Models::BattlerType], null: true
  
      def resolve()
        ::Battler.all
      end
    end
end