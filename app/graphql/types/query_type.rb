module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # each query type and resolver is defined in app/graphql/queries
    # note that this is one singular instance and one plural version
    field :battler, resolver: Queries::Battler
    field :battlers, resolver: Queries::Battlers
    field :user, resolver: Queries::User
    field :users, resolver: Queries::Users
    field :league, resolver: Queries::League
    field :leagues, resolver: Queries::Leagues
    field :battle, resolver: Queries::Battle
    field :battles, resolver: Queries::Battles
    field :battle_vote, resolver: Queries::BattleVote
    field :battle_votes, resolver: Queries::BattleVotes
    field :top_battles, resolver: Queries::TopBattles
    field :battler_battle_result, resolver: Queries::BattlerBattleResult
    field :battler_battle_results, resolver: Queries::BattlerBattleResults
    field :score, resolver: Queries::Score
    field :scores, resolver: Queries::Scores
    field :role, resolver: Queries::Role
    field :roles, resolver: Queries::Roles
    field :socialMediaPlatform, resolver: Queries::SocialMediaPlatform
    field :socialMediaPlatforms, resolver: Queries::SocialMediaPlatforms
    field :socialMediaLink, resolver: Queries::SocialMediaLink
    field :socialMediaLinks, resolver: Queries::SocialMediaLinks
    field :award, resolver: Queries::Award
    field :awards, resolver: Queries::Awards
  end
end
