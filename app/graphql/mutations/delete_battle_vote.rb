module Mutations
    class DeleteBattleVote < BaseMutation
        argument :battle_vote_id, ID, required: true

        field :message, String, null: false

        def resolve(battle_vote_id: nil)
            battle_vote = BattleVote.find_by(id: battle_vote_id)
            battle = Battle.find_by(id: battle_vote.battle.id)

            unless battle_vote.nil?
                scores = Score.where(battle_vote_id: battle_vote.id)
                scores.each do | score |
                    score.destroy
                end

                battle_vote.destroy

                if battle.battle_votes.count < Integer(ENV.fetch('VOTES_UNTIL_BATTLE_CLOSED'))
                    battle.battle_status = :open
                    battle.closed_at = nil
                    battle.score = 0
                    battle.save

                    # destroys all records of winners/losers
                    results = BattlerBattleResult.where(battle_id: battle.id)
                    results.each do | result |
                        result.destroy
                    end

                    # updates battler rating based on all their scores, excluding this battle which is now reopened
                    battle.battlers.each do |battler|
                        score_array = battler.scores.map(&:value)
                        unless score_array.empty?
                            battler.score = (score_array.sum.to_f / score_array.count) * 10
                            battler.save
                        else
                            battler.score = 0
                            battler.save 
                        end
                    end
                end

                return { message: "battle vote deleted" }
            end 
        end
    end
end

