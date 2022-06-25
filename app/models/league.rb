class League < ApplicationRecord
  has_many :battles
  has_many :battlers
  has_many :league_admins
  has_many :users, :through => :league_admins
  has_many :league_invitations

  # lets us alias the battlers model as "potential battlers" 
  # this makes league.potential_battlers explicitly different from league.battlers
  has_many :potential_battlers, :through=> :league_invitations, 
                                     :class_name => 'Battler', 
                                     :foreign_key => 'battler_id',
                                     :source => :battler
end
