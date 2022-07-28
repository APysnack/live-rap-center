class LeagueChatUser < ApplicationRecord
  belongs_to :league_chat
  belongs_to :user
end
