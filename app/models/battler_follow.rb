class BattlerFollow < ApplicationRecord
  belongs_to :user
  belongs_to :battler
end
