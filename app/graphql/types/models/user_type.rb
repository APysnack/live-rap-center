include Rails.application.routes.url_helpers

# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type
# note this matches the folder structure
module Types
  module Models
    class UserType < Types::BaseObject
      field :id, ID, null: false
      field :username, String, null: false
      field :email, String, null: false
      field :password_digest, String
      field :is_verified, Boolean, null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

      field :posts, [Types::Models::PostType], null: true
      field :posts_count, Integer, null: true
      field :roles, [Types::Models::RoleType], null: true
      field :battler, Types::Models::BattlerType, null: true
      field :leagues, [Types::Models::LeagueType], null: true
      field :profile_picture_url, String, null: true

      def posts_count
        object.posts.size
      end

      def roles
        object.roles
      end

      def battler
        object.battler
      end

      def profile_picture_url
        if object.image.present?
          rails_blob_path(object.image, host: ENV["SERVER_URL"])
        end
      end

      def leagues
        object.leagues
      end
    end
  end
end
