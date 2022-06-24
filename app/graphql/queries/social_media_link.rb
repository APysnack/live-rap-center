module Queries
    class SocialMediaLink < Queries::BaseQuery
      description 'Fetch Social Media Link by id'

      argument :id, ID, required: false
  
      type Types::Models::SocialMediaLinkType, null: true
  
      def resolve(id: nil)
        ::SocialMediaLink.find_by(id: id)
      end
    end
end