class AddCrewToCrewChat < ActiveRecord::Migration[7.0]
  def change
    add_reference :crew_chats, :crew, null: false, foreign_key: true
  end
end
