# Responses are built on top of models. Meant for including messages, metadata about the entire 
# model instead of just the instance e.g. model row count, etc.
module Types
    module Responses
      class BattlesResponseType < Types::BaseObject
        field :id, ID, null: false
        field :battles, [Types::Models::BattleType], null: true
        field :table_row_count, Integer, null: false

        def table_row_count
          Battle.all.count
        end
      end
    end
end
  