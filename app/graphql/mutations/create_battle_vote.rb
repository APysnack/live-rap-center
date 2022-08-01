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
        # extra protections needed to ensure voter does not vote more than once
        def resolve(input)
            battle = Battle.find_by(id: input[:battle_id])
            voter = User.find_by(id: input[:user_id])
            if battle.present? && voter.present?
                battleVote = BattleVote.create!(
                    voter_id: voter.id,
                    battle_id: battle.id,
                    comment: input[:comment],
                    selected_winner_id: input[:winner_battler_id],
                )

                Score.create(battler_id: input[:winner_battler_id], battle_vote_id: battleVote.id, value: input[:winner_battler_score], outcome: 0)
                Score.create(battler_id: input[:loser_battler_id], battle_vote_id: battleVote.id, value: input[:loser_battler_score], outcome: 1)

                if battle.battle_votes.count >= Integer(ENV.fetch('VOTES_UNTIL_BATTLE_CLOSED'))
                    battle.voting_status = :closed
                    battle.save

                    votes = BattleVote.where(battle_id: battle.id).map(&:selected_winner_id)
                    winner_id = votes.max_by { |i| votes.count(i) }
                    loser_id = battle.battlers.pluck(:id).excluding(winner_id)[0]

                    BattlerBattleResult.create(battler_id: winner_id, battle_id: battle.id, outcome: :win)
                    BattlerBattleResult.create(battler_id: loser_id, battle_id: battle.id, outcome: :loss)

                    battle.battlers.each do |battler|
                            score_array = battler.scores.map(&:value)
                            battler.score = score_array.sum.to_f / score_array.count
                            battler.save
                    end
                end
                return battleVote
            end
        end
    end
end