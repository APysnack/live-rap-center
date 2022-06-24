module Queries
    class SocialMediaLinks < Queries::BaseQuery
      description 'Fetch all supported Social Media Links'
  
      type [Types::Models::SocialMediaLinkType], null: true
  
      def resolve()
        ::SocialMediaPlatform.all
      end
    end
end