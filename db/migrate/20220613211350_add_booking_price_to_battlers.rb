class AddBookingPriceToBattlers < ActiveRecord::Migration[7.0]
  def change
    add_column :battlers, :booking_price, :integer, default: 0
  end
end
