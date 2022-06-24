module Queries
    class Role < Queries::BaseQuery
      description 'Fetch role by role id'

      argument :id, ID, required: false
  
      type Types::Models::RoleType, null: true
  
      def resolve(id: nil)
        ::Role.find_by(id: id)
      end
    end
end