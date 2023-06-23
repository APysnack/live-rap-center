module Queries
    class ChatMessages < Queries::BaseQuery
      description 'Fetch all chat messages'
      argument :chat_id, ID, required: false
        
      type [Types::Models::CrewChatMessageType], null: true
  
      def resolve(chat_id: nil)
        ::CrewChatMessage.where(crew_chat_id: chat_id)
      end
    end
end