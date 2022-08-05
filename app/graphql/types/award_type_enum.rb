# defines different types of awards (league awards, battler awards, etc.)
# used to determine whether the award should "belong to" the battler model, league model, etc.

module Types
    class AwardTypeEnum < Types::BaseEnum
        value "BATTLER", value: :battler_award
        value "VOTER", value: :voter_award
        value "LEAGUE", value: :league_award
    end
end