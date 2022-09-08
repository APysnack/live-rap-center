module Queries
    class Battles < Queries::BaseQuery
      description 'Fetch all battles (excludes prospective battles that havent occurred)'
  
      argument :search_text, String, required: false

      type [Types::Models::BattleType], null: true
  
      def resolve(search_text: nil)
        battles = ::Battle.where.not(battle_status: :prospective).order('score DESC')
        if search_text.present?
          battles = battles.joins(:battlers, :league).where("lower(battlers.name) LIKE ? OR lower(leagues.league_name) LIKE ?", "%#{search_text.downcase}%", "%#{search_text.downcase}%")
        end
        battles
      end
    end
end