module Types
  class MutationType < Types::BaseObject
    field :create_battle, mutation: Mutations::CreateBattle
    field :create_league, mutation: Mutations::CreateLeague
    field :create_post, mutation: Mutations::CreatePost
    field :delete_home_league, mutation: Mutations::DeleteHomeLeague
    field :update_battler_booking_price, mutation: Mutations::UpdateBattlerBookingPrice
    field :update_social_media_links, mutation: Mutations::UpdateSocialMediaLinks
    field :create_league_invitation, mutation: Mutations::CreateLeagueInvitation
    field :add_home_league_to_battler, mutation: Mutations::AddHomeLeagueToBattler
    field :delete_league_invitation, mutation: Mutations::DeleteLeagueInvitation
  end
end
