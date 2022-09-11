# Responses are built on top of models. Meant for including messages, metadata about the entire 
# model instead of just the instance e.g. model row count, etc.
module Types
    module Responses
      class BattlersResponseType < Types::BaseObject
        field :id, ID, null: false
        field :battlers, [Types::Models::BattlerType], null: true
        field :table_row_count, Integer, null: false

        def table_row_count
          Battler.all.count
        end
      end
    end
end
  