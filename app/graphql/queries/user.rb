module Queries
    class User < Queries::BaseQuery
      description 'Fetch user by user id'

      argument :id, ID, required: false
  
      type Types::Models::UserType, null: true
  
      def resolve(id:)
        user = ::User.find_by(id: id)
        return user
      end
    end
end