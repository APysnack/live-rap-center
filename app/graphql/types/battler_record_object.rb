# defines the gql type for the enumeration outcome on the score model (for battle votes)

module Types
    class BattlerRecordObject < Types::BaseObject
        field :wins, Integer, null: false
        field :losses, Integer, null: false
        field :ties, Integer, null: false
    end
end