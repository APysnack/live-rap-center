class MakeBattleUserNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :battles, :user_id, true
  end
end
