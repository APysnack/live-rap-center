module Types
  class MutationType < Types::BaseObject
    field :create_battle, mutation: Mutations::CreateBattle
    field :create_league, mutation: Mutations::CreateLeague
    field :create_post, mutation: Mutations::CreatePost
    field :update_battler_booking_price, mutation: Mutations::UpdateBattlerBookingPrice
    field :update_social_media_links, mutation: Mutations::UpdateSocialMediaLinks
    field :create_league_invitation, mutation: Mutations::CreateLeagueInvitation
    field :add_home_league_to_battler, mutation: Mutations::AddHomeLeagueToBattler
    field :delete_league_invitation, mutation: Mutations::DeleteLeagueInvitation
    field :delete_home_league_from_battler, mutation: Mutations::DeleteHomeLeagueFromBattler
    field :create_league_logo, mutation: Mutations::CreateLeagueLogo
    field :create_user_profile_picture, mutation: Mutations::CreateUserProfilePicture
    field :update_league_settings, mutation: Mutations::UpdateLeagueSettings
    field :update_battle_thumbnail, mutation: Mutations::UpdateBattleThumbnail
    field :update_battler_image, mutation: Mutations::UpdateBattlerImage
  end
end
