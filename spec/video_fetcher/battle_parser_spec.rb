require 'spec_helper'
require 'rails_helper'
require 'fabrication'
require './app/services/video_fetcher/battle_parser.rb'
require './spec/video_fetcher/battle_parser_mock_data.rb'

RSpec.describe VideoFetcher::BattleParser do
  let(:league) { Fabricate(:league, id: 55) }
  let(:bp) { VideoFetcher::BattleParser.new(BATTLE_PARSER_MOCK_DATA, league) }

  describe 'battle parser initialization' do
    it 'initializes with correct values' do
      expect(bp.video).to eq(BATTLE_PARSER_MOCK_DATA)
      expect(bp.league_id).to eq(league.id)
      expect(bp.views).to eq(BATTLE_PARSER_MOCK_DATA['view_count'])
      expect(bp.battle_url).to eq(BATTLE_PARSER_MOCK_DATA['id']['videoId'])
      expect(bp.date).to eq(BATTLE_PARSER_MOCK_DATA['snippet']['publishedAt'])
      expect(bp.title).to eq("KAVEMAN BROWN VS FLO LEEDS")
      expect(bp.battlers).to eq(["KAVEMAN BROWN", "FLO LEEDS"])
    end
  end
end
