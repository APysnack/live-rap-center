class AddYoutubeDateToBattles < ActiveRecord::Migration[7.0]
  def change
    add_column :battles, :youtube_date, :date
  end
end
