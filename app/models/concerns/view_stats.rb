module ViewStats
  extend ActiveSupport::Concern
  
  def battles_with_views
    battles.where.not(battle_status: 'prospective', views: nil)
  end
  
  def total_views
    battles_with_views.sum(&:views)
  end

  def view_counts
    battles_with_views.pluck(:views).compact
  end
  
  def average_views
    StatCalculator.new(view_counts).get_avg
  end

  def standard_deviation
    StatCalculator.new(view_counts).get_std_dev
  end
end
  