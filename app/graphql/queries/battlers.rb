module Queries
    class Battlers < Queries::BaseQuery
      description 'Fetch all battlers. Optional search text for filtering'

      argument :search_text, String, required: false
  
      type [Types::Models::BattlerType], null: true
  
      def resolve(search_text: nil)
        battlers = ::Battler.all.order('score desc')
        if search_text.present?
          battlers = battlers.where("lower(name) LIKE ?", "%#{search_text.downcase}%")
        end
        battlers
      end
    end
end