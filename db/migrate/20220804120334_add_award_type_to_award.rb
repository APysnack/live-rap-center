class AddAwardTypeToAward < ActiveRecord::Migration[7.0]
  def change
    add_column :awards, :award_type, :integer
  end
end
