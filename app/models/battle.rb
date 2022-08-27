class Battle < ApplicationRecord
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
end
