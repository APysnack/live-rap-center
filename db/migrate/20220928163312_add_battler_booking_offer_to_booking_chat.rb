class AddBattlerBookingOfferToBookingChat < ActiveRecord::Migration[7.0]
  def change
    add_reference :booking_chats, :battler_booking_offer, null: false, foreign_key: true
  end
end
