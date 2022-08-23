# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # calls valid? and authenticate! functions in config/initializers/devise.rb
  # sets current_user if user is valid
  before_action :authenticate_user!
  respond_to :json
  
  private
  def respond_with(resource, _opts = {})
    if current_user
      @hash = UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      render json: {
          status: {code: 200, message: 'Logged in sucessfully.'},
          data: @hash,
      }, status: :ok
    else
      render json: {
        status: {code: 200, message: 'Log in was unsuccessful'},
        data: nil
      }, status: :ok
    end
  end

  def respond_to_on_destroy
    @current_user = nil
    render json: {
      status: 200,
      message: "logged out successfully"
    }, status: :ok
  end
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
