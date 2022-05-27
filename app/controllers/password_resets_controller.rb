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
        binding.pry
        puts @user.id
        if @user.present?
            @user.password = params[:password]
            @user.save
            redirect_to "http://localhost:3000/login"
        end
    rescue ActiveSupport::MessageVerifier::InvalidSignature
        redirect_to "http://localhost:3000/login"
    end

    def update
        puts "sanity"
    end
   
end