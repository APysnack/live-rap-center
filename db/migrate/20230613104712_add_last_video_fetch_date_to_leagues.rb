class AddLastVideoFetchDateToLeagues < ActiveRecord::Migration[7.0]
  def change
    add_column :leagues, :last_video_fetch_date, :datetime, default: DateTime.new(2000, 1, 1, 0, 0, 0), null: false
  end
end
