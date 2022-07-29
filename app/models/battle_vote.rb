class BattleVote < ApplicationRecord
  belongs_to :voter
  belongs_to :battle
  has_many :scores
end
