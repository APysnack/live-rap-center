class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :jwt_authenticatable, :validatable, jwt_revocation_strategy: self
  has_one :league
  has_many :user_roles
  has_many :roles, through: :user_roles

  has_one :user_battler
  has_one :battler, through: :user_battlers
end
