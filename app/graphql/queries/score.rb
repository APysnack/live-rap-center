module Queries
    class Score < Queries::BaseQuery
      description 'Fetch score by score id'

      argument :id, ID, required: false
  
      type Types::Models::ScoreType, null: true
  
      def resolve(id: nil)
        ::Score.find_by(id: id)
      end
    end
end