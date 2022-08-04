# defines the gql type for the enumeration voting_status on the battle model (for battle votes)
# the battle is either open for voting or closed for voting

module Types
    class VotingStatusEnum < Types::BaseEnum
        value :open
        value :closed
    end
end