module Queries
    class Scores < Queries::BaseQuery
      description 'Fetch all battle votes'
  
      type [Types::Models::ScoreType], null: true
  
      def resolve()
        ::Score.all
      end
    end
end