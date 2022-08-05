# object associated with battler used to track how many wins/losses a battler has

module Types
    class BattlerRecordObject < Types::BaseObject
        field :wins, Integer, null: false
        field :losses, Integer, null: false
        field :ties, Integer, null: false
    end
end