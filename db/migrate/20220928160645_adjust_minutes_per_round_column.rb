class AdjustMinutesPerRoundColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :battler_booking_offers, :minutes_per_round, :integer
    add_column :battler_booking_offers, :minutes_per_round, :decimal, precision: 3, scale: 1
  end
end
