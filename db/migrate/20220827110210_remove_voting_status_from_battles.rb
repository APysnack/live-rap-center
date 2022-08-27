class RemoveVotingStatusFromBattles < ActiveRecord::Migration[7.0]
    def change
      remove_column :battles, :voting_status, :integer, default: 1
      add_column :battles, :battle_status, :integer, default: 1
    end
end
