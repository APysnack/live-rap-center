class VoterAward < ApplicationRecord
  belongs_to :voter
  belongs_to :award

  has_many :voter_awards
  has_many :awards, :through => :voter_awards
end
