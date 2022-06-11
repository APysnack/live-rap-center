class ProfilePictureController < ApplicationController
    def index
        render json: ProfilePicture.all
    end

    def create
        @user = User.find_by(id: params[:user_id])
        puts @user
        if @user.present?
            @profile_pic = ProfilePicture.find_by(user_id: @user.id)
            puts @profile_pic
            if @profile_pic.present?
                @profile_pic.update(profile_pic_params)
            else
                @profile_pic = ProfilePicture.create(profile_pic_params)
            end
            @profile_pic.save
            @hash = UserSerializer.new(@user).serializable_hash[:data][:attributes]
            if hash.present?
              render json: {
                status: {code: 200, message: 'Profile picture updated successfully.'},
                data: @hash
              }
            else
              render json: {
                status: {message: "Error with serialization of user. #{@user.errors.full_messages.to_sentence}"}
             }, status: :unprocessable_entity
            end

        else
            render json: {
                status: {code: 200, message: 'User was not found'},
                data: nil
            }, status: :ok
        end


    end

    private
    def profile_pic_params
        params.permit(:name, :user_id, :image)
    end
end
