module Mutations
    class DeleteAward < BaseMutation
        argument :award_id, ID, required: true

        field :message, String, null: false

        def resolve(award_id: nil)
            award = Award.find_by(id: award_id)
            if award.present?
                award.destroy
                return { message: "league invitation deleted" }
            end
        end
    end
end