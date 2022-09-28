class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :jwt_authenticatable, :validatable, jwt_revocation_strategy: self
  has_one :league
  has_one :battler
  has_one :voter
  has_one :location
  has_one_attached :image
  has_many :user_roles
  has_many :roles, through: :user_roles
  has_many :social_media_links
  has_many :league_admins
  has_many :league_chat_users, dependent: :destroy
  has_many :league_chats, through: :league_chat_users
  has_many :league_chat_messages, dependent: :destroy
  has_many :crew_chat_users, dependent: :destroy
  has_many :crew_chats, through: :crew_chat_users
  has_many :crew_chat_messages, dependent: :destroy
  has_many :crew_users 
  has_many :crews, through: :crew_users
  has_many :battler_follows
  has_many :followed_battlers, through: :battler_follows, :source => :battler
  has_many :booking_chat_users, dependent: :destroy
  has_many :booking_chats, through: :booking_chat_users
  has_many :booking_chat_messages, dependent: :destroy
  has_many :crew_invitations

  # lets us alias the crews model as "potential crews"
  # this makes battler.potential_crews explicitly different from battler.crews
  has_many :potential_crews, :through => :crew_invitations, 
    :class_name => 'Crew', 
    :foreign_key => 'crew_id',
    :source => :crew

  has_many :owned_leagues, :through => :league_admins, 
    :class_name => 'League',
    :foreign_key => 'league_id',
    :source => :league
end
