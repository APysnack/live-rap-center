module Mutations
    class CreateBattleVote < BaseMutation
        argument :user_id, ID, required: true
        argument :battle_id, ID, required: true
        argument :comment, String, required: true
        argument :winner_battler_id, ID, required: true
        argument :loser_battler_id, ID, required: true
        argument :winner_battler_score, Integer, required: true
        argument :loser_battler_score, Integer, required: true

        type Types::Models::BattleVoteType

        # TODO: currently only supports battles with 2 battles
        # this should be the only thing needed to be modified to extend to 2v2s
        # additionally, use outcome: 2 to create tie scores
        # extra protections to ensure voter does not vote more than once
        def resolve(input)
            voter = User.find_by(id: input[:user_id])
            battleVote = BattleVote.create!(
                voter_id: voter.id,
                battle_id: input[:battle_id],
                comment: input[:comment],
            )

            Score.create(battler_id: input[:winner_battler_id], battle_vote_id: battleVote.id, value: input[:winner_battler_score], outcome: 0)
            Score.create(battler_id: input[:loser_battler_id], battle_vote_id: battleVote.id, value: input[:loser_battler_score], outcome: 1)
            return battleVote
        end
    end
end