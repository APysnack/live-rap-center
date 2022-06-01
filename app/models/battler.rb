class Battler < ApplicationRecord
    has_many :battler_battles
    has_many :battles, :through => :battler_battles

    belongs_to :user, optional: true

    belongs_to :league, optional: true
end
