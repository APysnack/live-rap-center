# spec/video_fetcher/filter_videos_spec.rb

require 'spec_helper'
require './app/services/video_fetcher/filter_videos.rb'
require './spec/video_fetcher/filter_videos_mock_data.rb'

RSpec.describe VideoFetcher::FilterVideos do
  describe '#filter_by_versus' do
    it 'filters videos with "vs" or "versus" in the title' do
      filter_videos = VideoFetcher::FilterVideos.new(FILTER_VIDEOS_MOCK_DATA)
      filter_videos.filter_by_versus
      filtered_videos = filter_videos.videos
      expect(filtered_videos.length).to eq(8)
      expect(filtered_videos.all? { |video| video["snippet"]["title"] =~ /vs|versus/i }).to be_truthy
    end
  end
end
