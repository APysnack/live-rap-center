# namespace will reflect the module nesting shown below --> Types::Models::{modelNameHere}Type
# note this matches the folder structure

module Types
  module Models
    class PostType < Types::BaseObject
      field :id, ID, null: false
      field :user_id, Integer, null: false
      field :title, String
      field :body, String
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    end
  end
end
