class BattlerBookingOffer < ApplicationRecord
  belongs_to :booker_user, :class_name => 'User'
  belongs_to :battler_user, :class_name => 'User'
  enum status: [ :pending, :accepted, :denied ]
  has_one :booking_chat
end
