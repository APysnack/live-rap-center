class AddBattlerToLeague < ActiveRecord::Migration[7.0]
  def change
    add_reference :battlers, :league, null: false, foreign_key: true
  end
end
