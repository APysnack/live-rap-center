module Queries
    class Users < Queries::BaseQuery
      description 'Fetch all users'
  
      type [Types::Models::UserType], null: true
  
      def resolve()
        ::User.all
      end
    end
end