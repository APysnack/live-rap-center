module Queries
    class Leagues < Queries::BaseQuery
      description 'Fetch all leagues. Optional search text for filtering'

      argument :search_text, String, required: false
  
      type [Types::Models::LeagueType], null: true

      def resolve(search_text: nil)
        leagues = ::League.all.order('league_score desc NULLS LAST')
        if search_text.present?
          leagues = leagues.where("lower(league_name) LIKE ?", "%#{search_text.downcase}%")
        end
        leagues
      end
    end
end