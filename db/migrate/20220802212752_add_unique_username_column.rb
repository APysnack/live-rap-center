class AddUniqueUsernameColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :username, :string
    add_column :users, :username, :string, null: false
    add_index :users, :username, unique: true
  end
end
