class CreateBookingChatMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :booking_chat_messages do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :booking_chat, null: false, foreign_key: true

      t.timestamps
    end
  end
end
