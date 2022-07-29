module Mutations
    class CreateLeague < BaseMutation
        argument :user_id, Integer, required: false
        argument :league_name, String, required: true
        argument :league_url, String, required: true

        type Types::Models::LeagueType

        def resolve(league_name: nil, league_url: nil)
            league = League.create!(
                league_name: league_name,
                league_url: league_url
            )
            LeagueChat.create!(league_id: league.id)
            return league
        end
    end
end