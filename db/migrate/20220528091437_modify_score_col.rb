class ModifyScoreCol < ActiveRecord::Migration[7.0]
  def change
    remove_column :leagues, :league_score, :string
    add_column :leagues, :league_score, :int
  end
end
