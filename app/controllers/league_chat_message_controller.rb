class LeagueChatMessageController < ApplicationController
    def new
        @message = LeagueChatMessage.create(message_params)
        @league_chat = LeagueChat.find(@message[:league_chat_id])
        LeagueChatChannel.broadcast_to(@league_chat, @message)
        render json: @message
    end

    def index
        @messages = LeagueChatMessage.all
        render json: { messages: @messages }
    end

    private

    def message_params
        params.permit(:body, :league_chat_id, :user_id)
    end
end 