class AddBattlesToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :event_id, :integer, optional: true
    add_index :battles, :event_id
  end
end
