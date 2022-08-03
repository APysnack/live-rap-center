module Queries
    class Award < Queries::BaseQuery
      description 'Fetch award by award id'

      argument :id, ID, required: false
  
      type Types::Models::AwardType, null: true
  
      def resolve(id: nil)
        ::Award.find_by(id: id)
      end
    end
end