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
      field :owned_leagues, [Types::Models::LeagueType], null: true
      field :profile_picture_url, String, null: true
      field :social_media_links, [Types::Models::SocialMediaLinkType], null: true
      field :followed_battler_ids, [ID], null: true
      field :crews, [Types::Models::CrewType], null: true
      field :location, Types::Models::LocationType, null: true
      field :potential_crews, [Types::Models::CrewType], null: true
      field :selected_theme, String, null: true
      field :battler_booking_offers, [Types::Models::BattlerBookingOfferType], null: true

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
          Rails.env.production? ? object.image.url : url_for(object.image)
        end
      end

      def leagues
        object.leagues
      end

      def owned_leagues
        object.owned_leagues
      end

      def social_media_links
        object.social_media_links
      end

      def followed_battler_ids
        object.followed_battlers.map(&:id)
      end

      def crews
        object.crews
      end

      def potential_crews
        object.potential_crews
      end

      def location
        object.location
      end

      def battler_booking_offers
        BattlerBookingOffer.where("booker_user_id=? OR battler_user_id=?", object.id, object.id)
      end
    end
  end
end
