module Queries
    class Crew < Queries::BaseQuery
      description 'Fetch crew by crew id'

      argument :id, ID, required: false
  
      type Types::Models::CrewType, null: true
  
      def resolve(id: nil)
        ::Crew.find_by(id: id)
      end
    end
end