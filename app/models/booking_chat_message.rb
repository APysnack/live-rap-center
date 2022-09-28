class BookingChatMessage < ApplicationRecord
  belongs_to :user
  belongs_to :booking_chat
  delegate :username, :to => :user
end
