module Queries
    class Roles < Queries::BaseQuery
      description 'Fetch all roles'
  
      type [Types::Models::RoleType], null: true
  
      def resolve()
        ::Role.all
      end
    end
end