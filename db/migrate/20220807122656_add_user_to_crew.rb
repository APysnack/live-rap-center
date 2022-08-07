class AddUserToCrew < ActiveRecord::Migration[7.0]
  def change
    add_reference :crews, :user, null: false, foreign_key: true
  end
end
