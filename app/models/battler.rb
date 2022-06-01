class Battler < ApplicationRecord
    has_many :battler_battles
    has_many :battles, :through => :battler_battles

    has_one :user_battler
    has_one :user, :through => :user_battler

    belongs_to :league, optional: true
end
