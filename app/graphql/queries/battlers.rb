module Queries
  class Battlers < Queries::BaseQuery
    description 'Fetch all battlers. Optional search text for filtering'

    argument :search_text, String, required: false
    argument :ids, [ID], required: false
    argument :first_page_to_fetch, Integer, required: false
    argument :rows_to_fetch, Integer, required: false
    argument :fetch_all, Boolean, required: false
    argument :league_id, ID, required: false

    type Types::Responses::BattlersResponseType, null: true

    def resolve(search_text: nil, ids: nil, first_page_to_fetch: nil, rows_to_fetch: nil, fetch_all: false, league_id: nil)
      return { battlers: ::Battler.find(ids) } if ids.present?

      battlers = ::Battler.all

      battlers_result = if fetch_all
                          battlers.order(score: :desc, created_at: :asc)
                        elsif search_text.present?
                          battlers.where("lower(name) LIKE ?", "%#{search_text.downcase}%")
                        elsif league_id.present?
                          puts "SANITY CHECK: league_id: #{league_id}"
                          battlers.where(league_id: league_id).paginate(page: first_page_to_fetch, per_page: rows_to_fetch).order(score: :desc, created_at: :asc)
                        else
                          battlers.paginate(page: first_page_to_fetch, per_page: rows_to_fetch).order(score: :desc, created_at: :asc)
                        end

      return { battlers: battlers_result }
    end
  end
end
