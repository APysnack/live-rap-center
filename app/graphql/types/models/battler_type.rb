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
      field :score, Int, null: true
      field :booking_price, Integer, null: true
      field :booking_price_enabled, Boolean, null: true

      def user
        user = object.user
      end

      def league
        league = object.league
      end

      def battles
        battles = object.battles
      end
    end
  end
end
