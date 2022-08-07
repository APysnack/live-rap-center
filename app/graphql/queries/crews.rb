module Queries
    class Crews < Queries::BaseQuery
      description 'Fetch all crews'
  
      type [Types::Models::CrewType], null: true
  
      def resolve()
        ::Crew.all
      end
    end
end