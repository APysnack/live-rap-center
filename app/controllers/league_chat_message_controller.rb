class LeagueChatMessageController < ApplicationController
    def new
        @message = LeagueChatMessage.create(message_params)
        @league_chat = LeagueChat.find(@message[:league_chat_id])

        # data serialized to access username which is not directly on the LeagueChatMessage object
        @hash = LeagueChatMessageSerializer.new(@message).serializable_hash[:data]

        # broadcasts to the serialized json to the room once created
        LeagueChatChannel.broadcast_to(@league_chat, @hash)
        render json: @hash
    end

    def index
        @chat = LeagueChat.find_by(league_id: params[:id])
        @messages = LeagueChatMessage.where(league_chat_id: @chat.id)

        # data serialized to access username which is not directly on the LeagueChatMessage object
        @hash = LeagueChatMessageSerializer.new(@messages).serializable_hash[:data]
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
        params.permit(:body, :league_chat_id, :user_id)
    end
end 