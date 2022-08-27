module Queries
    class Event < Queries::BaseQuery
      description 'Fetch event by event id'

      argument :id, ID, required: false
  
      type Types::Models::EventType, null: true
  
      def resolve(id: nil)
        ::Event.find_by(id: id)
      end
    end
end