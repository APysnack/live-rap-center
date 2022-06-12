module Types
    class SocialMediaLinkType < Types::BaseObject
      field :id, ID
      field :user_id, ID
      field :social_media_platform_id, ID
      field :social_media_platform_name, String
      field :url, String

      def social_media_platform_name
        object.social_media_platform.name
      end
    end
end
  