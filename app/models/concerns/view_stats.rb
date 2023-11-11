module ViewStats
    extend ActiveSupport::Concern
  
    def battles_with_views
      self.battles
        .joins(:battle_stats)
        .where.not(battle_status: 'prospective')
        .where.not(battle_stats: { views: nil })
    end
  
    def total_views
      self.battles_with_views.sum(&:views)
    end
  
    def average_views
      return 0 unless self.battles_with_views.count > 0
      total_views / self.battles_with_views.count
    end
  end
  