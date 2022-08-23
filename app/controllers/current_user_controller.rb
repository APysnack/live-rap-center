class CurrentUserController < ApplicationController
  # FOO ENSURE AUTHENTICATE_USER HANDLES TOKENS
   # calls valid? and authenticate! functions in config/initializers/devise.rb
  before_action :authenticate_user!

  def index
    @hash = UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    render json: {
        status: {code: 200, message: 'Logged in sucessfully.'},
        data: @hash,
    }, status: :ok
  end
end
