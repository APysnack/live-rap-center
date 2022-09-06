# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type
include Rails.application.routes.url_helpers

module Types
  module Models
    class LeagueType < Types::BaseObject
      field :id, ID, null: false
      field :league_name, String, null: false
      field :league_url, String, null: false
      field :league_owner, ID, null: true
      field :league_score, Integer, null: true
      field :logo_url, String, null: true
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      field :battles, [Types::Models::BattleType], null: true
      field :battlers, [Types::Models::BattlerType], null: true
      field :upcoming_events, [Types::Models::EventType], null: true

      def battles
        object.battles
      end

      def battlers
        object.battlers
      end

      def logo_url
        if object.image.present?
          rails_blob_path(object.image, host: ENV["SERVER_URL"])
        end
      end

      def upcoming_events 
        object.events.where("date > ?", Time.now)
      end

      def league_score
        object.league_score
      end
    end
  end
end
