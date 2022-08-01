# defines the gql type for the enumeration voting_status on the battle model (for battle votes)

module Types
    class VotingStatusEnum < Types::BaseEnum
        value :open
        value :closed
    end
end