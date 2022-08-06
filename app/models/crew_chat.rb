class CrewChat < ApplicationRecord
    belongs_to :crew
    has_many :crew_chat_users, dependent: :destroy
    has_many :users, through: :crew_chat_users
    has_many :crew_chat_messages, dependent: :destroy
end
