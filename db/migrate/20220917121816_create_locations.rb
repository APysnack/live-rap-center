class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.belongs_to :user, null: true, foreign_key: true
      t.belongs_to :event, null: true, foreign_key: true
      t.string :country
      t.string :region

      t.timestamps
    end
  end
end
