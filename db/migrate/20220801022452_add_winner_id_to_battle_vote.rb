class AddWinnerIdToBattleVote < ActiveRecord::Migration[7.0]
  def change
    add_column :battle_votes, :selected_winner_id, :integer
  end
end