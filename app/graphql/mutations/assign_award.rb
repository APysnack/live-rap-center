module Mutations
    class AssignAward < BaseMutation
        argument :award_id, ID, required: true
        argument :recipient_id, ID, required: true

        type Types::Models::AwardType

        def resolve(input)
           award = Award.find_by(id: input[:award_id])
           if award.present?
            if award.award_type == "battler_award"
                battler = Battler.find_by(id: input[:recipient_id])
                if battler.present?
                    BattlerAward.create(award_id: award.id, battler_id: battler.id)
                end
            elsif award.award_type == "voter_award"
                voter = Voter.find_by(id: input[:recipient_id])
                if voter.present?
                    VoterAward.create(award_id: award.id, voter_id: voter.id)
                end
            else
                league = League.find_by(id: input[:recipient_id])
                if league.present?
                    LeagueAward.create(award_id: award.id, league_id: league.id)
                end
            end
          end
        end
    end
end