class VoterAward < ApplicationRecord
  belongs_to :voter
  belongs_to :award
end
