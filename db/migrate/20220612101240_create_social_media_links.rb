class CreateSocialMediaLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :social_media_links do |t|
      t.string :url

      t.timestamps
    end
  end
end
