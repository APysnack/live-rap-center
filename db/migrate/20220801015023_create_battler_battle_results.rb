class CreateBattlerBattleResults < ActiveRecord::Migration[7.0]
  def change
    create_table :battler_battle_results do |t|
      t.belongs_to :battler, null: false, foreign_key: true
      t.belongs_to :battle, null: false, foreign_key: true
      t.integer :outcome

      t.timestamps
    end
  end
end
