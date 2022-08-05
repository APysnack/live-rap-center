class CreateVoterAwards < ActiveRecord::Migration[7.0]
  def change
    create_table :voter_awards do |t|
      t.belongs_to :voter, null: false, foreign_key: true
      t.belongs_to :award, null: false, foreign_key: true

      t.timestamps
    end
  end
end
