module Queries
    class Battlers < Queries::BaseQuery
      description 'Fetch all battlers. Optional search text for filtering'

      argument :search_text, String, required: false
      argument :rows_to_fetch, Integer, required: false
      argument :first_page_to_fetch, Integer, required: false
      argument :fetch_all, Boolean, required: false
  
      type Types::Responses::BattlersResponseType, null: true
  
      def resolve(search_text: nil, first_page_to_fetch: nil, rows_to_fetch: nil, fetch_all: false)
        battlers = ::Battler.all
        return { battlers: battlers.order(score: :desc, created_at: :asc) } if fetch_all

        if search_text.present?
          battlers = battlers.where("lower(name) LIKE ?", "%#{search_text.downcase}%")
        end
        return { battlers: battlers.paginate(page: first_page_to_fetch, per_page: rows_to_fetch).order(score: :desc, created_at: :asc) }
      end
    end
end