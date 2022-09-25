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
    field :create_battle_vote, mutation: Mutations::CreateBattleVote
    field :delete_battle_vote, mutation: Mutations::DeleteBattleVote
    field :create_award, mutation: Mutations::CreateAward
    field :delete_award, mutation: Mutations::DeleteAward
    field :update_award, mutation: Mutations::UpdateAward
    field :assign_award, mutation: Mutations::AssignAward
    field :create_crew, mutation: Mutations::CreateCrew
    field :create_event, mutation: Mutations::CreateEvent
    field :update_event, mutation: Mutations::UpdateEvent
    field :delete_event, mutation: Mutations::DeleteEvent
    field :create_battler_follow, mutation: Mutations::CreateBattlerFollow
    field :delete_battler_follow, mutation: Mutations::DeleteBattlerFollow
    field :create_event_flyer_image, mutation: Mutations::CreateEventFlyerImage
    field :add_battle_to_upcoming_event, mutation: Mutations::AddBattleToUpcomingEvent
    field :update_user_location, mutation: Mutations::UpdateUserLocation
    field :create_crew_invitation, mutation: Mutations::CreateCrewInvitation
    field :add_crew_to_user, mutation: Mutations::AddCrewToUser
    field :delete_crew_invitation, mutation: Mutations::DeleteCrewInvitation
    field :update_selected_theme, mutation: Mutations::UpdateSelectedTheme
    field :create_battler_booking_offer, mutation: Mutations::CreateBattlerBookingOffer
  end
end
