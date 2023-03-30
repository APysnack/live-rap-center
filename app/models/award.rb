class Award < ApplicationRecord
  has_one_attached :image
  enum award_type: [:battler_award, :voter_award, :league_award]

  has_many :battler_awards
  has_many :battlers, through: :battler_awards

  has_many :voter_awards
  has_many :voters, through: :voter_awards

  has_many :league_awards
  has_many :leagues, through: :league_awards
end