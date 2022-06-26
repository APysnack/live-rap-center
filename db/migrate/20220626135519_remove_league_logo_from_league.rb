class RemoveLeagueLogoFromLeague < ActiveRecord::Migration[7.0]
  def change
    remove_column :leagues, :league_logo
  end
end
