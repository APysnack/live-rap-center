# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
  module Models
    class BattleType < Types::BaseObject
      field :id, ID, null: false
      field :user_id, ID, null: true
      field :league_id, ID, null: false
      field :views, Integer
      field :rating, Integer
      field :battle_url, String
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      field :battlers, [Types::Models::BattlerType], null: false
  
      def battlers
        object.battlers
      end
    end
  end
end
