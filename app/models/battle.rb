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

  # How many standard devs from the league's mean is this battle's views?
  def league_deviation
    return 0 if views.nil?
    calculate_zscore(league.battles.map(&:views))
  end

  # Returns object with all battler ids and battle's deviation away from battler mean
  def battler_deviations
    battlers.each_with_object({}) do |battler, deviations|
      deviations[battler.id] = battler_deviation(battler)
    end
  end

  private

  def battler_deviation(selected_battler)
    return 0 unless selected_battler&.total_views > 0
    calculate_zscore(selected_battler.battles.map(&:views))
  end

  def calculate_zscore(numbers)
    stat = StatCalculator.new(numbers)
    stat.get_zscore(views)
  end
end
