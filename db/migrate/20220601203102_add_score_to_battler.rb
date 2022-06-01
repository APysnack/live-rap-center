class AddScoreToBattler < ActiveRecord::Migration[7.0]
  def change
    add_column :battlers, :score, :integer, default: 0
  end
end
