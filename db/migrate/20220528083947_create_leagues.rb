class CreateLeagues < ActiveRecord::Migration[7.0]
  def change
    create_table :leagues do |t|
      t.string :league_name
      t.string :league_url
      t.string :league_owner
      t.string :league_score
      t.string :league_logo
      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
