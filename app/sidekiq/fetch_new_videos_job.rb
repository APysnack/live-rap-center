class FetchNewVideosJob
  include Sidekiq::Job

  def perform(*args)
    vf = VideoFetcher::FetchNewVideos.new
    vf.fetch_videos
  rescue => e
    puts "An error occurred: #{e.message}"
  end
end