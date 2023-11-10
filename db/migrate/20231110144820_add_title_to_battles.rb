class AddTitleToBattles < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :title, :string, null: true
  end
end
