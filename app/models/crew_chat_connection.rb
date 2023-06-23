class CrewChatConnection < ApplicationRecord
  belongs_to :user
  belongs_to :crew_chat
end
