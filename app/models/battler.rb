class Battler < ApplicationRecord
    has_many :battler_battles
    has_many :battles, :through => :battler_battles

    belongs_to :user, optional: true

    belongs_to :league, optional: true

    has_many :league_invitations
    has_one_attached :image
    has_many :scores

    has_many :battler_awards
    has_many :awards, :through => :battler_awards

    has_many :battler_follows
    has_many :users, through: :battler_follows

    # the overall outcome of a battle (win or loss) for each battler
    has_many :battler_battle_results

    # lets us alias the leagues model as "potential leagues"
    # this makes battler.potential_leagues explicitly different from battler.league
    has_many :potential_leagues, :through => :league_invitations, 
    :class_name => 'League', 
    :foreign_key => 'league_id',
    :source => :league
end
