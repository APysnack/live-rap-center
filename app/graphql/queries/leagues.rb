module Queries
    class Leagues < Queries::BaseQuery
      description 'Fetch all leagues. Optional search text for filtering'

      argument :search_text, String, required: false
      argument :rows_to_fetch, Integer, required: true
      argument :first_page_to_fetch, Integer, required: true
  
      type Types::Responses::LeaguesResponseType, null: true

      def resolve(search_text: nil, first_page_to_fetch: nil, rows_to_fetch: nil)
        leagues = ::League.all
        if search_text.present?
          leagues = leagues.where("lower(league_name) LIKE ?", "%#{search_text.downcase}%")
        end
        return { leagues: leagues.paginate(page: first_page_to_fetch, per_page: 2).order('league_score desc NULLS LAST') }
      end
    end
end