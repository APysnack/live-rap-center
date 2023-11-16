# VideoFetcher::FetchNewVideos.new.fetch_new_videos
module VideoFetcher
  class FilterVideos
		attr_reader :videos
		
		def initialize(videos)
			@videos = videos
    end

		def filter_videos
			puts "THIS IS WHAT A VIDEO RESPONSE LOOKS LIKE"
			puts videos

			filter_by_versus
      fetch_content_details
      remove_youtube_shorts
      @videos
		end

		def filter_by_versus
			@videos.select! do |video|
        title = video["snippet"]["title"].downcase
        title.include?('vs') || title.include?('versus')
      end
		end

		def fetch_content_details
			"placeholder"
		end

		def remove_youtube_shorts
			"placeholder"
		end
  end
end
      