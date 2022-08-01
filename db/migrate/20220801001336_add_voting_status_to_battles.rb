class AddVotingStatusToBattles < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :voting_status, :integer, default: 1
  end
end
