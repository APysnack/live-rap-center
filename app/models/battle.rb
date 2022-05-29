class Battle < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :league

  has_many :battler_battles
  has_many :battlers, through: :battler_battles
end
