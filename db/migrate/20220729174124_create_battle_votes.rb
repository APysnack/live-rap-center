class CreateBattleVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :battle_votes do |t|
      t.belongs_to :voter, null: false, foreign_key: true
      t.belongs_to :battle, null: false, foreign_key: true
      t.text :comment

      t.timestamps
    end
  end
end
