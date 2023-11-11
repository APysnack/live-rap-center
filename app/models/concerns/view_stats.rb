module ViewStats
    extend ActiveSupport::Concern
  
    def battles_with_views
      battles.where.not(battle_status: 'prospective', views: nil)
    end
  
    def total_views
      battles_with_views.sum(&:views)
    end
  
    def average_views
      return 0 unless battles_with_views.count > 0
      total_views / battles_with_views.count
    end
  end
  