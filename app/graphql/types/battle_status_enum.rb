# defines the gql type for the enumeration battle_status on the battle model (for battle votes)
# the battle is either prospective (hasn't occurred), open for voting or closed for voting

module Types
    class BattleStatusEnum < Types::BaseEnum
        value :prospective
        value :open
        value :closed
    end
end