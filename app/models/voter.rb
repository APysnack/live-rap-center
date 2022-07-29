class Voter < ApplicationRecord
  belongs_to :user, optional: true
  has_many :battle_votes
end
