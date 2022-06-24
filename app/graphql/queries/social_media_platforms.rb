module Queries
    class SocialMediaPlatforms < Queries::BaseQuery
      description 'Fetch all supported Social Media Platforms'
  
      type [Types::Models::SocialMediaPlatformType], null: true
  
      def resolve()
        ::SocialMediaPlatform.all
      end
    end
end