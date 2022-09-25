class CreateBattlerBookingOffers < ActiveRecord::Migration[7.0]
  def change
    create_table :battler_booking_offers do |t|
      t.references :booker_user
      t.references :battler_user
      t.integer :number_of_rounds
      t.integer :minutes_per_round
      t.integer :amount_offered
      t.text :comments
      t.datetime :date

      t.timestamps
    end

    add_column :battler_booking_offers, :status, :integer, default: 0
  end
end
