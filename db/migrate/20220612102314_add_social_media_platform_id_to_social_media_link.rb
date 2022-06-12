class AddSocialMediaPlatformIdToSocialMediaLink < ActiveRecord::Migration[7.0]
  def change
    add_column :social_media_links, :social_media_platform_id, :integer
    add_index  :social_media_links, :social_media_platform_id
  end
end
