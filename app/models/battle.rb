class Battle < ApplicationRecord
  validates :battle_url, uniqueness: true

  belongs_to :user, optional: true
  belongs_to :event, optional: true
  belongs_to :league

  has_one :battle_stats, class_name: 'BattleStat', dependent: :destroy, inverse_of: :battle

  has_many :battler_battles
  has_many :battlers, through: :battler_battles

  has_many :battle_votes
  has_many :voters, through: :battle_votes
  has_many :battler_battle_results

  enum battle_status: [ :prospective, :open, :closed ]

  has_one_attached :thumbnail

  delegate :views, to: :battle_stats, prefix: false, allow_nil: true
  delegate :league_deviation, to: :battle_stats, prefix: false, allow_nil: true
  delegate :battler_deviation, to: :battle_stats, prefix: false, allow_nil: true
end
