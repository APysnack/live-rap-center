class LeagueChatChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    league_chat = LeagueChat.find(params[:id])
    stream_for league_chat
  end

  def unsubscribed
    stop_all_streams
  end
end
