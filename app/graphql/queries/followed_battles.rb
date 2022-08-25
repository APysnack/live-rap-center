module Queries
    class FollowedBattles < Queries::BaseQuery
      description 'Fetch recent battles from followed battlers'
      argument :user_id, ID, required: true
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
        end_date = Time.now
        range = start_date..end_date

        user = ::User.find_by(id: input[:user_id])
        followed_battlers = user.battler_follows.map(&:battler_id)

        # order battles by date created
        order = 'created_at DESC'

        ::Battle.joins(:battlers).where(created_at: range, :battlers => { id: followed_battlers }).order(order).limit(input[:battle_count])
      end
    end
end