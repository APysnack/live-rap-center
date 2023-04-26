# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
  module Models
    class BattleType < Types::BaseObject
      field :id, ID, null: false
      field :user_id, ID, null: true
      field :league_id, ID, null: false
      field :views, Integer
      field :battle_url, String
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      field :battlers, [Types::Models::BattlerType], null: false
      field :thumbnail, String, null: true
      field :battle_votes, [Types::Models::BattleVoteType], null: false
      field :battle_status, Types::BattleStatusEnum, null: false
      field :battle_winner, Types::Models::BattlerType, null: true
      field :score, Float, null: false
      field :league_name, String, null: true
      field :league, Types::Models::LeagueType, null: true
  
      def battlers
        object.battlers
      end

      def thumbnail
        if object.thumbnail.present?
          rails_blob_path(object.thumbnail, host: ENV["SERVER_URL"])
        end
      end

      def battle_votes
        object.battle_votes
      end

      def score
        object.score
      end

      def league_name
        object.league.league_name || ''
      end

      def league
        object.league
      end

      def battle_winner
        BattlerBattleResult.find_by(battle_id: object.id, outcome: :win).try(:battler)
      end
    end
  end
end
