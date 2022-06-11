class PasswordResetsController < ApplicationController 
    def new

    end

    def create
        @requestor = params[:user]
        @user = User.find_by(email: @requestor[:email])
        if @user.present?
            PasswordMailer.with(user: @user).reset.deliver_later
        end
        render json: {
            status: {code: 200, message: 'If an account with that email was found, we have sent a link to reset your password'},
        }
    end

    # TODO: complete process for editing user
    def edit
        @user = User.find_signed!(params[:token], purpose: "password_reset")
        if @user.present?
            @user.password = params[:password]
            if @user.save
              render json: {
                status: {code: 200, message: 'Password updated successfully.'},
              }
            else
              render json: {
                status: {message: "Error trying to serialize user. #{@user.errors.full_messages.to_sentence}"}
              }, status: :unprocessable_entity
            end
        else
            render json: {
                status: {message: "user not found. #{@user.errors.full_messages.to_sentence}"}
              }, status: :unprocessable_entity
        end

    rescue ActiveSupport::MessageVerifier::InvalidSignature
        redirect_to  ENV["CLIENT_URL"]
    end

    def update
        puts "sanity"
    end
   
end