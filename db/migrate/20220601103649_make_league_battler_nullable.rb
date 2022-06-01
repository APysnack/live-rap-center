class MakeLeagueBattlerNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :battlers, :league_id, true
  end
end
