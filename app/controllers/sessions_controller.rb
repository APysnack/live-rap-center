# All other controllers inherit from this controller
class SessionsController < ApplicationController
    respond_to :json

    def new
        # note the authenticate_request! method on application controller sets Current.user before this takes place
        if Current.user
            @hash = UserSerializer.new(Current.user).serializable_hash[:data][:attributes]
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

    def destroy
        render json: {
            status: 200,
            message: "logged out successfully"
        }, status: :ok
    end
end
