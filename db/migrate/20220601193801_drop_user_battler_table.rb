class DropUserBattlerTable < ActiveRecord::Migration[7.0]
  def up
    drop_table :user_battlers
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
