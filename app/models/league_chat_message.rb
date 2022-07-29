class LeagueChatMessage < ApplicationRecord
  belongs_to :league_chat
  belongs_to :user
  delegate :username, :to => :user
end
