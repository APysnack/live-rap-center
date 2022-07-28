class CreateLeagueChats < ActiveRecord::Migration[7.0]
  def change
    create_table :league_chats do |t|
      t.belongs_to :league, null: false, foreign_key: true

      t.timestamps
    end
  end
end
