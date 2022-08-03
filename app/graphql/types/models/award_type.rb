# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type
include Rails.application.routes.url_helpers

module Types
  module Models
    class AwardType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :image_url, String, null: true
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

      def image_url
        if object.image.present?
          rails_blob_path(object.image, host: ENV["SERVER_URL"])
        end
      end
    end
  end
end
