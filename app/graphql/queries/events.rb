module Queries
    class Events < Queries::BaseQuery
      description 'Fetch all events'
  
      type [Types::Models::EventType], null: true
  
      def resolve()
        ::Event.all
      end
    end
end