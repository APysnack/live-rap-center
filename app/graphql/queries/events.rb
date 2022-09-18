module Queries
    class Events < Queries::BaseQuery
      description 'Fetch all events'
      argument :country, String, required: false
      argument :region, String, required: false
  
      type [Types::Models::EventType], null: true
  
      def resolve(country: nil, region: nil)
        events = ::Event.all
        if !country.empty?
          events = events.joins(:location).where("locations.country LIKE ?", country)
          if !region.empty?
            events = events.joins(:location).where("locations.region LIKE ?", region)
          end
        end
        return events
      end
    end
end