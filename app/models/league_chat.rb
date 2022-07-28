class LeagueChat < ApplicationRecord
  belongs_to :league
  has_many :league_chat_users, dependent: :destroy
  has_many :users, through: :league_chat_users
  has_many :league_chat_messages, dependent: :destroy
end
