class CreateBattleStats < ActiveRecord::Migration[7.0]
  def change
    create_table :battle_stats do |t|
      t.integer :views
      t.float :league_deviation
      t.float :battler_deviation
      t.references :battle, null: false, foreign_key: true

      t.timestamps
    end
  end
end
