module Mutations
    class UpdateAward < BaseMutation
        argument :award_id, ID, required: true
        argument :award_name, String, required: false 
        argument :award_type, Types::AwardTypeEnum, required: false

        type Types::Models::AwardType

        def resolve(input)
            award = Award.find_by(id: input[:award_id])
            if award.present?
                unless input[:award_name].nil?
                    award.name = input[:award_name]
                end
                unless input[:award_type].nil?
                    award.award_type = input[:award_type]
                end
                if award.save
                    return award
                end
            end
        end

    end
end