# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type

module Types
    module Models
      class BattlerBookingOfferType < Types::BaseObject
        field :id, ID, null: false
        field :battler, Types::Models::UserType, null: false
        field :booker, Types::Models::UserType, null: false
        field :number_of_rounds, Integer, null: false
        field :minutes_per_round, Integer, null: false
        field :comments, String
        field :date, GraphQL::Types::ISO8601DateTime, null: false
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

        def battler
          battler = object.battler_user
        end
  
        def booker
          booker = object.booker_user
        end
      end
    end
  end
  