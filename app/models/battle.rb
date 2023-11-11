class Battle < ApplicationRecord
  validates :battle_url, uniqueness: true

  belongs_to :user, optional: true
  belongs_to :event, optional: true
  belongs_to :league

  has_many :battler_battles
  has_many :battlers, through: :battler_battles

  has_many :battle_votes
  has_many :voters, through: :battle_votes
  has_many :battler_battle_results

  enum battle_status: [ :prospective, :open, :closed ]

  has_one_attached :thumbnail

  def league_deviation
    league_views = league.battles.pluck(:views).compact
    league_standard_deviation = Math.sqrt(league_views.map { |views| (views - league.average_views) ** 2 }.sum / league.battles.count)
    current_battle_deviation = Math.sqrt((views - league.average_views) ** 2)
    current_battle_deviation / league_standard_deviation
  end
end
