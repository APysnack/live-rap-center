module Mutations
    class UpdateLeagueSettings < BaseMutation
        # Custom object defined in base_input_object.rb
        argument :league_id, ID, required: true
        argument :league_name, String, required: true

        type Types::Models::LeagueType

        def resolve(league_id: nil, league_name: nil)
            league = League.find_by(id: league_id)
            if league.present?
                league.league_name = league_name
                if league.save
                    return league
                end
            end
        end

    end
end