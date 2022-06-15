class AddBookingPriceEnabledToBattlers < ActiveRecord::Migration[7.0]
  def change
    add_column :battlers, :booking_price_enabled, :boolean, default: false
  end
end
