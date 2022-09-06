module Types
    module Models
      class LocationType < Types::BaseObject
        field :id, ID, null: false
        field :country, String, null: true
        field :region, String, null: true
      end
    end
  end
  