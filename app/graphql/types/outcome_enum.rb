# defines the gql type for the enumeration outcome on the score model (for battle votes)

module Types
    class OutcomeEnum < Types::BaseEnum
        value :win
        value :loss
        value :tie
    end
end