class Battler < ApplicationRecord
    has_many :battler_battles
    has_many :battles, :through => :battler_battles

    belongs_to :user, optional: true

    belongs_to :league, optional: true

    has_many :league_invitations
    has_one_attached :image
    has_many :scores

    # lets us alias the leagues model as "potential leagues"
    # this makes battler.potential_leagues explicitly different from battler.league
    has_many :potential_leagues, :through => :league_invitations, 
    :class_name => 'League', 
    :foreign_key => 'league_id',
    :source => :league
end
