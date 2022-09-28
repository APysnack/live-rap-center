class BookingChatUser < ApplicationRecord
  belongs_to :booking_chat
  belongs_to :user
end
