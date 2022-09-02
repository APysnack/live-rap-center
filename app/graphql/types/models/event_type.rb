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

      def flyer_image_url
        if object.flyer_image.present?
          rails_blob_path(object.flyer_image, host: ENV["SERVER_URL"])
        end
      end
    end
  end
end