# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
    module Models
      class ScoreType < Types::BaseObject
        field :id, ID, null: false
        field :battle_vote_id, ID, null: true
        field :value, Integer
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
        field :outcome, Types::OutcomeEnum, null: false
        field :battler_name, String, null: false
        field :battler_id, ID, null: false

        def battler_name
          object.battler.name
        end

        def battler_id
          object.battler_id
        end
      end
    end
  end
  