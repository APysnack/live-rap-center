class BattlerAward < ApplicationRecord
  belongs_to :battler
  belongs_to :award
end
