class CreateBattlers < ActiveRecord::Migration[7.0]
  def change
    create_table :battlers do |t|
      t.string :name

      t.timestamps
    end
  end
end
