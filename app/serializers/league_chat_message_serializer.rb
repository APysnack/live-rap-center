class LeagueChatMessageSerializer
    include JSONAPI::Serializer
    attributes :id, :body
  
    attribute :username do |object|
      object.user.username
    end
  end
  