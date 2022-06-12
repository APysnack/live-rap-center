class AddUserIdToSocialMediaLink < ActiveRecord::Migration[7.0]
  def change
        add_column :social_media_links, :user_id, :integer
        add_index  :social_media_links, :user_id
  end
end
