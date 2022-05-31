module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :users, [Types::UserType], null: false
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    field :leagues, [Types::LeagueType], null: false
    field :league, Types::LeagueType, null: false do
      argument :id, ID, required: true
    end

    field :battles, [Types::BattleType], null: false
    field :battle, Types::BattleType, null: false do
      argument :id, ID, required: true
    end

    def users
      User.all
    end

    def user(id:)
      User.find_by(id: id)
    end

    def leagues
      League.all
    end

    def league(id:)
      League.find_by(id: id)
    end

    def battles
      Battle.all
    end

    def battle(id:)
      Battle.find_by(id: id)
    end

  end
end
