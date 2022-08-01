class AdjustBattlerScores < ActiveRecord::Migration[7.0]
  def change
    remove_column :battlers, :score, :integer
    add_column :battlers, :score, :decimal, precision: 3, scale: 2, default: 0.0
  end
end