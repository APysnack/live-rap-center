class Crew < ApplicationRecord
    has_one :crew_chat
    has_many :crew_users 
    has_many :users, through: :crew_users


    has_many :crew_invitations
    # lets us alias the battlers model as "potential battlers" 
    # this makes league.potential_battlers explicitly different from league.battlers
    has_many :potential_users, :through=> :crew_invitations, 
                                       :class_name => 'User', 
                                       :foreign_key => 'user_id',
                                       :source => :user
end
