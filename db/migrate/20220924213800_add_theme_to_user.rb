class AddThemeToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :selected_theme, :string, null: true
  end
end
