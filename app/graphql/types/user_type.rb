# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :password_digest, String
    field :is_verified, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :posts, [Types::PostType], null: true
    field :posts_count, Integer, null: true
    field :roles, [Types::RoleType], null: true
    field :battler, Types::BattlerType, null: true
    field :profile_picture, Types::ProfilePictureType, null: true
    field :leagues, [Types::LeagueType], null: true

    def posts_count
      object.posts.size
    end

    def roles
      object.roles
    end

    def battler
      object.battler
    end

    def profile_picture
      object.profile_picture
    end

    def leagues
      object.leagues
    end
  end
end
