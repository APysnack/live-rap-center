include Rails.application.routes.url_helpers

module Types
  module Models
    class EventType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :admission_cost, Integer, null: false
      field :address, String, null: true 
      field :date, GraphQL::Types::ISO8601DateTime, null: false
      field :league, Types::Models::LeagueType, null: false
      field :battles, [Types::Models::BattleType], null: true
      field :flyer_image_url, String, null: true
      field :location, Types::Models::LocationType, null: true

      def flyer_image_url
        if object.flyer_image.present?
          Rails.env.production? ? object.flyer_image.url : url_for(object.flyer_image)
        end
      end

      def location
        object.location
      end
    end
  end
end