class BattlerBookingOffer < ApplicationRecord
  belongs_to :booker_user, :class_name => 'User'
  belongs_to :battler_user, :class_name => 'User'
  enum status: [ :pending, :accepted, :denied ]
  has_one :booking_chat

  has_one :battler, :through => :battler_user, 
  :class_name => 'Battler', 
  :foreign_key => 'id',
  :source => :battler
end
