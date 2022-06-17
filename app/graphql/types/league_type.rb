# frozen_string_literal: true

module Types
  class LeagueType < Types::BaseObject
    field :id, ID, null: false
    field :league_name, String, null: false
    field :league_url, String, null: false
    field :league_owner, ID, null: true
    field :league_score, Integer
    field :league_logo, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :battles, [Types::BattleType], null: true
    field :battlers, [Types::BattlerType], null: true

    def battles
      object.battles
    end

    def battlers
      object.battlers
    end
  end
end
