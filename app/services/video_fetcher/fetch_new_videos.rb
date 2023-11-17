# VideoFetcher::FetchNewVideos.new.fetch_new_videos

# in sequential order of execution:
# fetch_new_videos: entrypoint
# channel_video_fetcher: fetches videos from a youtube channel
# filter_videos: filters unwanted videos
# battle_parser: parses battle into easily accessible instance variables

require 'typhoeus'
require 'amatch'
require 'fuzzy_match'

module VideoFetcher
  class FetchNewVideos
    attr_accessor :fuzzy_matcher

    SIMILARITY_THRESHOLD = 0.95
    CHARACTERS_TO_REMOVE = [' ', '.', '-']

    def initialize()
      @fuzzy_matcher = FuzzyMatch.new(Battler.pluck(:name))
    end

    def fetch_new_videos
      leagues.each do |league|
        processed_urls = []
        channel_fetcher = VideoFetcher::ChannelVideoFetcher.new(league)
        new_videos = channel_fetcher.fetch_videos
          
        create_battles_for(new_videos, league, processed_urls)

        while channel_fetcher.next_page_token.present? && !league.videos_initialized
          new_videos = channel_fetcher.fetch_videos
          create_battles_for(new_videos, league, processed_urls)
        end

        league.update(videos_initialized: true, last_video_fetch_date: Time.now)
      end
    end

    def find_or_create_battler(battler_name)
      battler = Battler.find_by(name: battler_name)
      return battler if battler
    
      best_match = get_best_match_for(battler_name)
      similarity = get_similarity(battler_name, best_match)

      similarity > SIMILARITY_THRESHOLD ? Battler.find_by(name: best_match) : Battler.create(name: battler_name)
    end

    private

    def get_similarity(battler_name, best_match)
      sanitized_battler_name = sanitize(battler_name)
      sanitized_match_name = sanitize(best_match)
      Amatch::JaroWinkler.new(sanitized_battler_name).match(sanitized_match_name)
    end

    def sanitize(string)
      characters_regex = Regexp.union(CHARACTERS_TO_REMOVE)
      string.gsub(characters_regex, '')
    end

    def leagues 
      League.all
    end

    def get_best_match_for(battler_name)
      best_match = fuzzy_matcher.find(battler_name)
    end

    def create_battles_for(videos, league, processed_urls)
      return unless videos&.length > 0
    
      videos.each do |video|
        battle_url = video['id']['videoId']
        next if processed_urls.include?(battle_url)
    
        processed_urls << battle_url
        create_battle(video, league)
      end
    end

    def create_battle(video, league)
      bp = VideoFetcher::BattleParser.new(video, league)

      battle = Battle.create(league_id: bp.league_id, battle_url: bp.battle_url, title: bp.title, views: bp.views, youtube_date: bp.date)
      
      bp.battlers.each do |battler_name|
        battler = find_or_create_battler(battler_name)
        BattlerBattle.create(battler_id: battler.id, battle_id: battle.id)
      end
    end
  end
end
    