class ChangeLeagueDependency < ActiveRecord::Migration[7.0]
  def change
    change_column_null :leagues, :user_id, true
  end
end
