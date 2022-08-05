class Award < ApplicationRecord
  has_one_attached :image
  enum award_type: [:battler_award, :voter_award, :league_award]
end