require 'typhoeus'

# VideoFetcher::FetchNewVideos.new.fetch_new_videos
module VideoFetcher
  class FilterVideos
		attr_reader :videos, :video_api_url, :content_details
		
		def initialize(videos)
			@videos = videos
      @video_api_url = "#{ENV['YT_VIDEO_API']}?key=#{ENV['YT_API_KEY']}"
      @content_details = nil
      @MINUTE_THRESHOLD = 7
    end

		def filter_videos
			filter_by_versus
      filter_youtube_shorts
      @videos
		end

		def filter_by_versus
			@videos.select! do |video|
        title = video["snippet"]["title"].downcase
        title.include?('vs') || title.include?('versus')
      end
		end

    def filter_youtube_shorts
      @content_details = fetch_content_details
      @videos = remove_youtube_shorts
    end
    
    private

    def remove_youtube_shorts
      @videos.map do |video|
        video_content_details = @content_details.find { |detail| detail['id'] == video['id']['videoId'] }

        duration = video_content_details&.dig('contentDetails', 'duration')

        if duration && exceeds_duration(duration)
          video['view_count'] = video_content_details['statistics']['viewCount']
          video
        else
          nil
        end
      end.compact
    end

    def exceeds_duration(video)
      duration_obj = ActiveSupport::Duration.parse(video)
      hours = duration_obj.parts[:hours].to_i
      minutes = duration_obj.parts[:minutes].to_i
      hours.positive? || minutes >= @MINUTE_THRESHOLD
    rescue => error
      false
    end

    def fetch_content_details
      response = Typhoeus.get(video_api_url, { params: payload })
      parse_response(response)
    end

    def parse_response(response)
      data = JSON.parse(response.body)["items"]
    end

    def video_ids
      @videos.map { |video| video["id"]["videoId"] }.join(',')
    end

    def payload
      payload = {
        id: video_ids,
        maxResults: 50,
        part: 'contentDetails,statistics',
      }
    end
  end
end
      