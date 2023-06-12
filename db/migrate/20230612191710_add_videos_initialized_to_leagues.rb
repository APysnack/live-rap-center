class AddVideosInitializedToLeagues < ActiveRecord::Migration[6.0]
  def change
    add_column :leagues, :videos_initialized, :boolean, default: false, null: false
  end
end
