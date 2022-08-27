class Battle < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :league
  belongs_to :event

  has_many :battler_battles
  has_many :battlers, through: :battler_battles

  has_many :battle_votes
  has_many :voters, through: :battle_votes
  has_many :battler_battle_results

  enum voting_status: [ :closed, :open ]

  has_one_attached :thumbnail
end
