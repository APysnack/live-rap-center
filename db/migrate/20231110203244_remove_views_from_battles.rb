class RemoveViewsFromBattles < ActiveRecord::Migration[7.0]
  def change
    remove_column :battles, :views, :integer
  end
end
