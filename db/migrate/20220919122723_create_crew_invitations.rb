class CreateCrewInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :crew_invitations do |t|
      t.belongs_to :crew, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
