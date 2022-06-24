module Queries
    class Battle < Queries::BaseQuery
      description 'Fetch battle by battle id'

      argument :id, ID, required: false
  
      type Types::Models::BattleType, null: true
  
      def resolve(id: nil)
        ::Battle.find_by(id: id)
      end
    end
end