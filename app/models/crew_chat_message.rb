class CrewChatMessage < ApplicationRecord
  belongs_to :user
  belongs_to :crew_chat
  delegate :username, :to => :user
end
