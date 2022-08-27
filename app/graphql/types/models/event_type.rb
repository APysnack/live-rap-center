module Types
  module Models
    class EventType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :admission_cost, Integer, null: false
      field :address, String, null: false 
      field :date, GraphQL::Types::ISO8601DateTime, null: false
      field :league, Types::Models::LeagueType, null: false
      field :battles, [Types::Models::BattleType], null: true
    end
  end
end