class VideosController < ApplicationController

  def fetch_videos
    response = Typhoeus.get("#{ENV['YT_VIDEO_API']}", params: { key: ENV['YT_API_KEY'], part: 'snippet, statistics, player', id: params[:ids] } )
    data = JSON.parse(response.body, symbolize_names: true)
    render json: { items: data[:items] }, status: 200
  end

end