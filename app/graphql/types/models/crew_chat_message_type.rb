module Types
    module Models
      class CrewChatMessageType < Types::BaseObject
        field :id, ID, null: false
        field :user, Types::Models::UserType, null: true
        field :crew, Types::Models::CrewType, null: true
        field :body, String

        def user
          object.user
        end

        def crew 
          object.crew
        end
      end
    end
end