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
      field :award_type, String, null: true

      def image_url
        if object.image.present?
          Rails.env.production? ? object.image.url : url_for(object.image)
        end
      end

      def award_type
        object.award_type.to_s
      end
    end
  end
end
