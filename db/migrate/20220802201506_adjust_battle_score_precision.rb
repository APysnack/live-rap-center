class AdjustBattleScorePrecision < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :score, :decimal, precision: 4, scale: 1, default: 0.0
  end
end