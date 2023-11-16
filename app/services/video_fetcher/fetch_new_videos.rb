# VideoFetcher::FetchNewVideos.new.fetch_new_videos
module VideoFetcher
  class FetchNewVideos
    def initialize()
    end

    def leagues 
      League.all
    end

    def fetch_new_videos
      leagues.each do |league|
        channel_fetcher = VideoFetcher::ChannelVideoFetcher.new(league)
        response = channel_fetcher.fetch_videos
        new_videos = response[:videos]
        processed_urls = []
        
        # create_battles_for(new_videos, league, processed_urls) if new_videos.length > 0


        if league.videos_initialized == false
          while channel_fetcher.next_page_token.present?
            response = channel_fetcher.fetch_videos
            new_videos = response[:videos]
            # create_battles_for(new_videos, league, processed_urls) if new_videos.length > 0
          end
        end

        league.update(videos_initialized: true, last_video_fetch_date: Time.now)
      end
    end
  end
end
    