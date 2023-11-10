class League < ApplicationRecord
  attribute :last_video_fetch_date, :date
  
  has_many :battles
  has_many :battlers
  has_many :league_admins
  has_many :users, :through => :league_admins
  has_many :events
  has_one :league_chat
  has_one_attached :image


  has_many :league_awards
  has_many :awards, :through => :league_awards

  has_many :league_invitations
  # lets us alias the battlers model as "potential battlers" 
  # this makes league.potential_battlers explicitly different from league.battlers
  has_many :potential_battlers, :through=> :league_invitations, 
                                     :class_name => 'Battler', 
                                     :foreign_key => 'battler_id',
                                     :source => :battler


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
    total_views / self.battles_with_views.count
  end
end
