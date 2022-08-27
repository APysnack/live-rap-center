class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.integer :admission_cost
      t.datetime :date
      t.string :address
      t.string :name
      t.belongs_to :league, null: false, foreign_key: true

      t.timestamps
    end
  end
end
