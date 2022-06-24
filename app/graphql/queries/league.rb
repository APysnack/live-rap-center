module Queries
    class League < Queries::BaseQuery
      description 'Fetch league by league id'

      argument :id, ID, required: false
  
      type Types::Models::LeagueType, null: true
  
      def resolve(id: nil)
        ::League.find_by(id: id)
      end
    end
end