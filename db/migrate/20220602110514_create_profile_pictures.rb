class CreateProfilePictures < ActiveRecord::Migration[7.0]
  def change
    create_table :profile_pictures do |t|
      t.string :name

      t.timestamps
    end
  end
end
