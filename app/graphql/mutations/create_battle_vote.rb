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
        # additionally, use outcome: 2 if you want to add tie scores
        # extra protections needed to ensure voter does not vote more than once
        def resolve(input)
            battle = Battle.find_by(id: input[:battle_id])
            voting_user = User.find_by(id: input[:user_id])

            if valid_vote?(battle, voting_user)
                battleVote = BattleVote.create!(
                    voter_id: voting_user.voter_id,
                    battle_id: battle.id,
                    comment: input[:comment],
                    selected_winner_id: input[:winner_battler_id],
                )

                Score.create(battler_id: input[:winner_battler_id], battle_vote_id: battleVote.id, value: input[:winner_battler_score], outcome: 0)
                Score.create(battler_id: input[:loser_battler_id], battle_vote_id: battleVote.id, value: input[:loser_battler_score], outcome: 1)

                if battle.battle_votes.count >= Integer(ENV.fetch('VOTES_UNTIL_BATTLE_CLOSED'))
                    battle.battle_status = :closed
                    battle.closed_at = Time.now
                    total = 0
                    count = 0

                    # (i think, averages all votes from this battle and scores the battle) 
                    battle.battle_votes.each do | vote |
                        total += vote.scores.map(&:value).sum
                        count += 2
                    end

                    battle.score = (total.to_f / count) * 10
                    battle.save

                    # all votes for this battle that belong to the winner
                    votes = BattleVote.where(battle_id: battle.id).map(&:selected_winner_id)

                    # winner determined by most votes (logic may need to be pluralized for 2v2s)
                    winner_id = votes.max_by { |i| votes.count(i) }

                    # loser is all ids excluding the winner id(s)
                    loser_id = battle.battlers.pluck(:id).excluding(winner_id)[0]

                    BattlerBattleResult.create(battler_id: winner_id, battle_id: battle.id, outcome: :win)
                    BattlerBattleResult.create(battler_id: loser_id, battle_id: battle.id, outcome: :loss)

                    battle.battlers.each do |battler|
                            score_array = battler.scores.map(&:value)
                            battler.score = (score_array.sum.to_f / score_array.count) * 10
                            battler.save
                    end
                end
                return battleVote
            end
        end

        def valid_vote?(battle, voting_user)
            return false unless battle.present?
            return false unless voting_user.present? 

            # ensure battler is not voting on their own battle
            return false if battle.battlers.map(&:id).include?(voting_user.battler.id)

            # ensure that a voter has not already voted
            return false if battle.battle_votes.pluck(:voter_id).include?(voting_user.id)
            return true
        end
    end
end