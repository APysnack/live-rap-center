class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.belongs_to :battler, null: false, foreign_key: true
      t.belongs_to :battle_vote, null: false, foreign_key: true
      t.integer :value
      t.integer :outcome

      t.timestamps
    end
  end
end
