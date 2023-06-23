class CreateCrewChatConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :crew_chat_connections do |t|
      t.references :user, null: false, foreign_key: true
      t.references :crew_chat, null: false, foreign_key: true
      t.string :connection_id, null: false

      t.timestamps
    end
  end
end
