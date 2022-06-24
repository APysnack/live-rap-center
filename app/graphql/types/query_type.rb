module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # each query type and resolver is defined in app/graphql/queries
    field :battler, resolver: Queries::Battler
    field :battlers, resolver: Queries::Battlers
    field :user, resolver: Queries::User
    field :users, resolver: Queries::Users
    field :league, resolver: Queries::League
    field :leagues, resolver: Queries::Leagues
    field :battle, resolver: Queries::Battle
    field :battles, resolver: Queries::Battles
    field :role, resolver: Queries::Role
    field :roles, resolver: Queries::Roles
    field :socialMediaPlatform, resolver: Queries::SocialMediaPlatform
    field :socialMediaPlatforms, resolver: Queries::SocialMediaPlatforms
    field :socialMediaLink, resolver: Queries::SocialMediaLink
    field :socialMediaLinks, resolver: Queries::SocialMediaLinks
  end
end
