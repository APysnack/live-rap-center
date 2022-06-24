module Queries
    class User < Queries::BaseQuery
      description 'Fetch user by user id'

      argument :id, ID, required: false
  
      type Types::Models::UserType, null: true
  
      def resolve(id: nil)
        ::User.find_by(id: id)
      end
    end
end