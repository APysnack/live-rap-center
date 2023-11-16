require 'securerandom'

class FetchNewVideosJob
  include Sidekiq::Job

  def perform(*args)
    puts "Fetching new videos... WORKING KINDAIDK"
    random_url = SecureRandom.hex(8)
    Battle.create(title: "placeholder", league_id: 1, battle_url: random_url, youtube_date: Time.now)
  end
end