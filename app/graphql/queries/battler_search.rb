module Queries
    class BattlerSearch < Queries::BaseQuery
      description 'Fetch battler matches by substring input'

      argument :search_string, String, required: true
  
      type [Types::Models::BattlerType], null: true
  
      def resolve(search_string: nil)
        matches = ::Battler.where("lower(name) LIKE ?", "%#{search_string.downcase}%")
      end
    end
end


