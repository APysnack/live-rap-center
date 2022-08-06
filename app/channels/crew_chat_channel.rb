class CrewChatChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    crew_chat = CrewChat.find(params[:id])
    stream_for crew_chat
  end

  def unsubscribed
    stop_all_streams
  end
end
