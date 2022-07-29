# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
    module Models
      class BattleVoteType < Types::BaseObject
        field :id, ID, null: false
        field :battle_id, ID, null: false
        field :voter_id, ID, null: true
        field :comment, String
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
        field :scores, [Types::Models::ScoreType], null: false
        field :voter_name, String, null: true
    
        def scores
          object.scores
        end

        def voter_name
          voter = Voter.find_by(id: object.voter_id)
          voter.user.username
        end
      end
    end
  end
  