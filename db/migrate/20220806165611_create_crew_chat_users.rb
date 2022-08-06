class CreateCrewChatUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :crew_chat_users do |t|
      t.belongs_to :crew_chat, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
