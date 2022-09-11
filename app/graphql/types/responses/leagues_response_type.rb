# Responses are built on top of models. Meant for including messages, metadata about the entire 
# model instead of just the instance e.g. model row count, etc.
module Types
    module Responses
      class LeaguesResponseType < Types::BaseObject
        field :id, ID, null: false
        field :leagues, [Types::Models::LeagueType], null: true
        field :table_row_count, Integer, null: false

        def table_row_count
          League.all.count
        end
      end
    end
end
  