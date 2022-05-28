class CreateBattles < ActiveRecord::Migration[7.0]
  def change
    create_table :battles do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :league, null: false, foreign_key: true
      t.bigint :views
      t.integer :rating
      t.string :battle_url

      t.timestamps
    end
  end
end
