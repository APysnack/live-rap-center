# frozen_string_literal: true

module Types
  class BattlerType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user, Types::UserType, null: true
    field :league, Types::LeagueType, null: true
    field :battles, [Types::BattleType], null: true
    field :score, Int, null: false

    def user
      user = object.user
    end

    def league
      league = object.league
    end

    def battles
      battles = object.battles
    end
  end
end
