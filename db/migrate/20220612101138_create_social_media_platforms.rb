class CreateSocialMediaPlatforms < ActiveRecord::Migration[7.0]
  def change
    create_table :social_media_platforms do |t|
      t.string :name

      t.timestamps
    end
  end
end
