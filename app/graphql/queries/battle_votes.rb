module Queries
    class BattleVotes < Queries::BaseQuery
      description 'Fetch all battle votes'
  
      type [Types::Models::BattleVoteType], null: true
  
      def resolve()
        ::BattleVote.all
      end
    end
end