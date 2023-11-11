# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
  module Models
    class BattlerType < Types::BaseObject
      field :id, ID, null: false
      field :name, String
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      field :user, Types::Models::UserType, null: true
      field :league, Types::Models::LeagueType, null: true
      field :battles, [Types::Models::BattleType], null: true
      field :score, Integer, null: true
      field :booking_price, Integer, null: true
      field :booking_price_enabled, Boolean, null: true
      field :potential_leagues, [Types::Models::LeagueType], null: true
      field :total_views, Integer, null: true
      field :average_views, Float, null: true
      field :league_id, ID, null: false
      field :image, String, null: true
      field :record, Types::BattlerRecordObject, null: false
      field :battle_count, Integer, null: true
      field :region, String, null: true

      def user
        user = object.user
      end

      def league
        league = object.league
      end

      def battles
        battles = object.battles
      end

      def potential_leagues
        potentialLeagues = object.potential_leagues
      end

      def image
        if object.image.present?
          Rails.env.production? ? object.image.url : url_for(object.image)
        end
      end

      def battle_count
        object.battles.count
      end

      def record 
        record = Hash.new()
        record[:wins] = object.battler_battle_results.pluck(:outcome).count("win")
        record[:losses] = object.battler_battle_results.pluck(:outcome).count("loss")
        record[:ties] = object.battler_battle_results.pluck(:outcome).count("tie")
        record
      end

      def region
        begin
          return object.user.location.region
        rescue 
          return ''
        end
      end
    end
  end
end
