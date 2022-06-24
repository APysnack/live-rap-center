module Queries
    class SocialMediaPlatform < Queries::BaseQuery
      description 'Fetch Social Media Platform by id'

      argument :id, ID, required: false
  
      type Types::Models::SocialMediaPlatformType, null: true
  
      def resolve(id: nil)
        ::SocialMediaPlatform.find_by(id: id)
      end
    end
end