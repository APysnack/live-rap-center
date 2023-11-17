# spec/video_fetcher/filter_videos_spec.rb

require 'spec_helper'
require 'rails_helper'
require './app/services/video_fetcher/filter_videos.rb'
require './spec/video_fetcher/filter_videos_mock_data.rb'

RSpec.describe VideoFetcher::FilterVideos do
  describe '#filter_by_versus' do
    it 'filters videos with "vs" or "versus" in the title' do
      vf = VideoFetcher::FilterVideos.new(FILTER_VIDEOS_MOCK_DATA)
      vf.filter_by_versus
      filtered_videos = vf.videos
      expect(filtered_videos.length).to eq(8)
      expect(filtered_videos.all? { |video| video["snippet"]["title"] =~ /vs|versus/i }).to be_truthy
    end
  end

  describe '#filter_youtube_shorts' do
    it 'filters out videos with durations shorter than 8 minutes' do
      allow_any_instance_of(VideoFetcher::FilterVideos).to receive(:fetch_content_details).and_return(CONTENT_DETAILS_MOCK_DATA)
      vf = VideoFetcher::FilterVideos.new(FILTER_VIDEOS_MOCK_DATA)
      vf.filter_by_versus
      vf.filter_youtube_shorts
      filtered_videos = vf.videos

      expect(filtered_videos.length).to eq(5)
    end
  end
end
