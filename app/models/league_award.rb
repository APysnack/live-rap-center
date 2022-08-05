class LeagueAward < ApplicationRecord
  belongs_to :league
  belongs_to :award
end
