module Queries
    class Battles < Queries::BaseQuery
      description 'Fetch all battles (excludes prospective battles that havent occurred)'
  
      argument :search_text, String, required: false
      argument :rows_to_fetch, Integer, required: true
      argument :first_page_to_fetch, Integer, required: true

      type Types::Responses::BattlesResponseType, null: true
  
      def resolve(search_text: nil, first_page_to_fetch: nil, rows_to_fetch: nil)
        battles = ::Battle.where.not(battle_status: :prospective)
        if search_text.present?
          battles = battles.joins(:battlers, :league).where("lower(battlers.name) LIKE ? OR lower(leagues.league_name) LIKE ?", "%#{search_text.downcase}%", "%#{search_text.downcase}%")
        end
        return { battles: battles.paginate(page: first_page_to_fetch, per_page: rows_to_fetch).order(score: :desc, created_at: :asc) }
      end
    end
end