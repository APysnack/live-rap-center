# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
    module Models
      class BattlerFollowType < Types::BaseObject
        field :id, ID, null: false
        field :user_id, Integer, null: false
        field :battler_id, Integer, null: false
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      end
    end
end
  