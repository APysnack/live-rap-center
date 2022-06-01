class AddBattlerToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :battlers, :user, null: true, foreign_key: true
  end
end
