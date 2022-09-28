class BookingChatMessageController < ApplicationController
    def new
        # bug notice: we're receiving a duplicate chat_message param we didn't send 
        @booking_chat = BookingChat.find(message_params[:battler_booking_offer_id])
        @message = BookingChatMessage.create(booking_chat_id: @booking_chat.id, user_id: message_params[:user_id], body: message_params[:body])
        # data serialized to access username which is not directly on the BookingChatMessage object
        @hash = BookingChatMessageSerializer.new(@message).serializable_hash[:data]
        
        # broadcasts to the serialized json to the room once created
        BookingChatChannel.broadcast_to(@booking_chat, @hash)
        render json: @hash
    end

    def index
        @chat = BookingChat.find_by(battler_booking_offer_id: params[:id])
        @messages = BookingChatMessage.where(booking_chat_id: @chat.id).order(created_at: :desc)

        # data serialized to access username which is not directly on the BookingChatMessage object
        @hash = BookingChatMessageSerializer.new(@messages).serializable_hash[:data]
        if hash.present?
          render json: @hash
        else
          render json: {
            status: {message: "Error"}
          }, status: :unprocessable_entity
        end
    end

    private

    def message_params
        params.permit(:body, :battler_booking_offer_id, :user_id)
    end
end 