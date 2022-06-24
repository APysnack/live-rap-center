module Types
  class MutationType < Types::BaseObject
    field :create_battle, mutation: Mutations::CreateBattle
    field :create_league, mutation: Mutations::CreateLeague
    field :create_post, mutation: Mutations::CreatePost
    field :delete_home_league, mutation: Mutations::DeleteHomeLeague
    field :update_battler, mutation: Mutations::UpdateBattler
    field :update_social_media_links, mutation: Mutations::UpdateSocialMediaLinks
  end
end
