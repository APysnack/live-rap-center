class League < ApplicationRecord
  has_many :battles
  has_many :battlers
  has_many :league_admins
  has_many :users, :through => :league_admins
end
