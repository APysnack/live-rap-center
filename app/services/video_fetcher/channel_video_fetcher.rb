module VideoFetcher
  class ChannelVideoFetcher
    attr_reader :channel_id, :last_fetch_date, :videos_initialized, :search_api_url, :next_page_token
    
    def initialize(league)
      @search_api_url = "#{ENV['YT_SEARCH_API']}?key=#{ENV['YT_API_KEY']}"
      @league = league
      @channel_id = league.league_url
      @last_fetch_date = league.last_video_fetch_date.strftime('%Y-%m-%dT%H:%M:%S.%LZ')
      @videos_initialized = league.videos_initialized
      @next_page_token = nil
    end

    def fetch_videos
      response = Typhoeus.get(search_api_url, { params: payload })
      parse_response(response)
    end

    private

    def parse_response(response)
      data = JSON.parse(response.body)
      @next_page_token = data['nextPageToken'] || nil
      videos = data['items']
      filtered_videos = VideoFetcher::FilterVideos.new(videos).filter_videos
      { videos: filtered_videos }
    end

    def payload
      payload = {
        channelId: channel_id,
        type: 'video',
        maxResults: 50,
        part: 'snippet',
        order: 'date',
        publishedAfter: last_fetch_date,
      }
      payload[:pageToken] = next_page_token unless next_page_token.nil?
      payload
    end
  end
end