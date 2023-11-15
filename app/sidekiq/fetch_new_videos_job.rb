class FetchNewVideosJob
  include Sidekiq::Job

  def perform(*args)
    puts "Fetching new videos... WORKING KINDAIDK"
  end
end