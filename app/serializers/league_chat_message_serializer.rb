class LeagueChatMessageSerializer
    include JSONAPI::Serializer
    attributes :id, :body, :user_id
  
    attribute :username do |object|
      object.user.username
    end
  end
  