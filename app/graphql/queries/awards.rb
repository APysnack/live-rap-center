module Queries
    class Awards < Queries::BaseQuery
      description 'Fetch all awards'
  
      type [Types::Models::AwardType], null: true
  
      def resolve()
        ::Award.all.order(:award_type)
      end
    end
end