class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :jwt_authenticatable, :validatable, jwt_revocation_strategy: self
  has_one :league
  has_many :user_roles
  has_many :roles, through: :user_roles
  has_many :social_media_links
  has_one :battler
  has_one :voter
  has_many :league_admins
  has_many :leagues, :through => :league_admins
  has_one_attached :image
  has_many :league_chat_users, dependent: :destroy
  has_many :league_chats, through: :league_chat_users
  has_many :league_chat_messages, dependent: :destroy
  has_many :crew_chat_users, dependent: :destroy
  has_many :crew_chats, through: :crew_chat_users
  has_many :crew_chat_messages, dependent: :destroy
  has_many :battler_follows
  has_many :followed_battlers, through: :battler_follows, :source => :battler
end
