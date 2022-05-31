class AddLeagueToBattles < ActiveRecord::Migration[7.0]
  def change
    add_reference :battles, :league, null: false, foreign_key: true
  end
end
