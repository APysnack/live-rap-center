# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type
include Rails.application.routes.url_helpers

module Types
  module Models
    class CrewType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :creator_user_id, ID, null: false
      field :crew_chat_id, ID, null: false
      field :crew_chat_users, [Types::Models::UserType], null: false

      def creator_user_id
        object.user_id
      end

      def crew_chat_id
        object.crew_chat.id
      end

      def crew_chat_users 
        object.crew_chat.users
      end
    end
  end
end
