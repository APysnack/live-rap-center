class CrewChatMessageController < ApplicationController
    def new
        # bug notice: we're receiving a duplicate crew_chat_message param we didn't send 
        @crew_chat = CrewChat.find(message_params[:crew_id])
        @message = CrewChatMessage.create(crew_chat_id: @crew_chat.id, user_id: message_params[:user_id], body: message_params[:body])

        # data serialized to access username which is not directly on the CrewChatMessage object
        @hash = CrewChatMessageSerializer.new(@message).serializable_hash[:data]

        # broadcasts to the serialized json to the room once created
        CrewChatChannel.broadcast_to(@crew_chat, @hash)
        render json: @hash
    end

    def index
        @chat = CrewChat.find_by(crew_id: params[:id])
        @messages = CrewChatMessage.where(crew_chat_id: @chat.id).order(created_at: :desc)

        # data serialized to access username which is not directly on the CrewChatMessage object
        @hash = CrewChatMessageSerializer.new(@messages).serializable_hash[:data]
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
        params.permit(:body, :crew_id, :user_id)
    end
end 