class BookingChatChannel < ApplicationCable::Channel
    def subscribed
      stop_all_streams
      booking_chat = BookingChat.find(params[:id])
      stream_for booking_chat
    end
  
    def unsubscribed
      stop_all_streams
    end
  end