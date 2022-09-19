module Queries
    class Users < Queries::BaseQuery
      description 'Fetch all users'

      argument :search_text, String, required: false
  
      type [Types::Models::UserType], null: true
  
      def resolve(search_text: nil)
        users = ::User.all
        # currently doing all searching on the front-end, will want to add in backend filtering to optimize performance eventually
        if search_text.present?
          users = users.where("lower(username) LIKE ?", "%#{search_text.downcase}%")
        end
        return users
      end
    end
end