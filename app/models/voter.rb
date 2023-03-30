class Voter < ApplicationRecord
  belongs_to :user, optional: true
  has_many :battle_votes

  has_many :voter_awards
  has_many :awards, through: :voter_awards, source: :award
end
