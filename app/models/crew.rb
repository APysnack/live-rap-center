class Crew < ApplicationRecord
    has_one :crew_chat
    has_many :crew_users 
    has_many :users, through: :crew_users
end
