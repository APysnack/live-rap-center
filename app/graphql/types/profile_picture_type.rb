# frozen_string_literal: true
include Rails.application.routes.url_helpers

module Types
  class ProfilePictureType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user_id, Integer
    field :url, String, null: true

    def url
      rails_blob_url(object.image, host: ENV["SERVER_URL"])
    end
  end
end
