module Types
  class MutationType < Types::BaseObject
    field :create_post, mutation: Mutations::CreatePost
    field :create_league, mutation: Mutations::CreateLeague
    field :create_battle, mutation: Mutations::CreateBattle
  end
end
