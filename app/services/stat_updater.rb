class StatUpdater
  def initialize
    @api_url = ENV['YT_VIDEO_API']
    @api_key = ENV['YT_API_KEY']
    @maximum_batch_size = 50
  end

  def update_battle_views
    battles = Battle.where.not(battle_status: 'prospective')
    video_ids = battles.map(&:battle_url).compact

    video_ids.each_slice(@maximum_batch_size) do |batch|
      views = fetch_youtube_views(batch)
      update_battle_stats(battles, views)
    end
  end

  private

  def fetch_youtube_views(video_ids)
    video_ids_str = video_ids.join(',')
    url = "#{@api_url}?part=statistics&id=#{video_ids_str}&key=#{@api_key}"

    response = Typhoeus.get(url)
    data = JSON.parse(response.body)

    data['items'].each_with_object({}) do |item, views_hash|
      video_id = item['id']
      views = item['statistics']['viewCount'].to_i
      views_hash[video_id] = views
    end
  end

  def update_battle_stats(battles, views)
    battles.each do |battle|
      video_id = battle.battle_url
      battle.update(views: views[video_id]) if views.key?(video_id)
      battle.save
    end
  end
end
