class AddClosedAtToBattles < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :closed_at, :datetime, default: nil
  end
end