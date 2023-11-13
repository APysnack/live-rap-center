class AddViewsToBattles < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :views, :integer
  end
end
