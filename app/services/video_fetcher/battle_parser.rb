module VideoFetcher
  class BattleParser
    attr_accessor :video, :views, :title, :battlers, :battle_url, :date, :league_id

    def initialize(video, league)
      @video = video
      @league_id = league.id
      @battlers = get_battlers
      @battle_url = get_battle_url
      @date = get_date_of_battle
      @views = get_views
      @title = get_title
    end

    def get_battlers
      sanitizer = VideoFetcher::TitleSanitizer.new(@video['snippet']['title'])
      sanitizer.battlers
    end

    def get_title
      if battlers.length == 2 || battlers.length == 3
        battlers.join(' VS ')
      else
        team_a = "#{battlers[0]} & #{battlers[1]}"
        team_b = "#{battlers[2]} & #{battlers[3]}"
        "#{team_a} VS #{team_b}"
      end
    end

    def get_views
      video['view_count']
    end

    def get_battle_url
      video['id']['videoId']
    end

    def get_date_of_battle
      video['snippet']['publishedAt']
    end
  end
end
    