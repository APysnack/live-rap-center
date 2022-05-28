# frozen_string_literal: true

module Types
  class LeagueType < Types::BaseObject
    field :id, ID, null: false
    field :league_name, String, null: false
    field :league_url, String, null: false
    field :league_owner, String
    field :league_score, Integer
    field :league_logo, String
    field :user_id, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
