class Battler < ApplicationRecord
    has_one :user_battlers
    has_one :user, :through => :user_battlers
    
    has_many :battler_battles
    has_many :battles, :through => :battler_battles
end
