class CreateLeagueChatUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :league_chat_users do |t|
      t.belongs_to :league_chat, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
