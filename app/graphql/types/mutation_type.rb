module Types
  class MutationType < Types::BaseObject
    field :create_post, mutation: Mutations::CreatePost
    field :create_league, mutation: Mutations::CreateLeague
    field :create_battle, mutation: Mutations::CreateBattle
    field :update_social_media_links, mutation: Mutations::UpdateSocialMediaLinks
    field :delete_home_league, mutation: Mutations::DeleteHomeLeague
  end
end
