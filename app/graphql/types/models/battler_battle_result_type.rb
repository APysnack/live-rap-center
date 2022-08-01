# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
    module Models
      class BattlerBattleResultType < Types::BaseObject
        field :id, ID, null: false
        field :battler_id, ID, null: false
        field :battle_id, ID, null: true
        field :outcome, Types::OutcomeEnum, null: false
      end
    end
  end
  