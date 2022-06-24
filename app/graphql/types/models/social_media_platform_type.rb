# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type
# note this matches the folder structure

module Types
  module Models
    class SocialMediaPlatformType < Types::BaseObject
      field :id, ID
      field :name, String
    end
  end
end