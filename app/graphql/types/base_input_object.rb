module Types
  class BaseInputObject < GraphQL::Schema::InputObject
    argument_class Types::BaseArgument
  end

  class Types::SocialMediaLinkAttributes < Types::BaseInputObject
    description "Attributes for creating or updating a social media link"
    argument :social_media_platform_id, Integer, "The platform id the link belongs to"
    argument :url, String, "The http link to the user's social media"
  end
end
