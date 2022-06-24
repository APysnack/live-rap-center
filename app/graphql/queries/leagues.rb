module Queries
    class Leagues < Queries::BaseQuery
      description 'Fetch all leagues'
  
      type [Types::Models::LeagueType], null: true
  
      def resolve()
        ::League.all
      end
    end
end