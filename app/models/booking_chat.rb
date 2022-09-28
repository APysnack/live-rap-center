class BookingChat < ApplicationRecord
    belongs_to :battler_booking_offer
    has_many :booking_chat_users, dependent: :destroy
    has_many :users, through: :booking_chat_users
    has_many :booking_chat_messages, dependent: :destroy
end
