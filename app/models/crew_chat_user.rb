class CrewChatUser < ApplicationRecord
  belongs_to :crew_chat
  belongs_to :user
end
