class CurrentUserController < ApplicationController
    before_action :authenticate_user!
    
    def index
      @hash = UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      if hash.present?
        render json: {
          status: {code: 200, message: 'Logged in sucessfully.'},
          data: @hash
        }
      else
        render json: {
          status: {message: "User couldn't be logged in. #{current_user.errors.full_messages.to_sentence}"}
        }, status: :unprocessable_entity
      end
    end
end