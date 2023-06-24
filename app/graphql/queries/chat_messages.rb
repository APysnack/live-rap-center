module Queries
    class ChatMessages < Queries::BaseQuery
      description 'Fetch all chat messages'
      argument :chat_id, ID, required: true
      argument :chat_type, String, required: true
        
      type [Types::Models::CrewChatMessageType], null: true
  
      def resolve(chat_type: nil, chat_id: nil)
        if chat_type == 'crew'
          ::CrewChatMessage.where(crew_chat_id: chat_id).order(created_at: :desc)
        else
          ::LeagueChatMessage.where(league_chat_id: chat_id).order(created_at: :desc)
        end
      end
    end
end