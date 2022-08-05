# defines the gql type for the enumeration outcome on the score model (for battle votes)
# when a voter votes on a battle they score one battler with a win, one with a loss, one with a tie

module Types
    class OutcomeEnum < Types::BaseEnum
        value :win
        value :loss
        value :tie
    end
end