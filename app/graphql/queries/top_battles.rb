module Queries
    class TopBattles < Queries::BaseQuery
      description 'Fetch top battle_count ranked battles of this week'
      argument :battle_count, Integer, required: true
      argument :date_range, String, required: true

      type [Types::Models::BattleType], null: true
  
      def resolve(input)
        if input[:date_range].eql? "Weekly"
          subtracted_val = 1.week
        else
          subtracted_val = 1.month
        end

        start_date = Time.now - subtracted_val
        end_date= Time.now
        ::Battle.all.where(closed_at: start_date.to_time..end_date.to_time).order('score DESC').limit(input[:battle_count])
      end
    end
end