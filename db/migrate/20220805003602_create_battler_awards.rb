class CreateBattlerAwards < ActiveRecord::Migration[7.0]
  def change
    create_table :battler_awards do |t|
      t.belongs_to :battler, null: false, foreign_key: true
      t.belongs_to :award, null: false, foreign_key: true

      t.timestamps
    end
  end
end
