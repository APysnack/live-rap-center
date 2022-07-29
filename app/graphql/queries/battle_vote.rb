module Queries
    class BattleVote < Queries::BaseQuery
      description 'Fetch battle vote by battle vote id'

      argument :id, ID, required: false
  
      type Types::Models::BattleVoteType, null: true
  
      def resolve(id: nil)
        ::BattleVote.find_by(id: id)
      end
    end
end