class ProfilePictureController < ApplicationController
    def index
        render json: ProfilePicture.all
    end

    def create
        profile_pic = ProfilePicture.create(profile_pic_params)
        render json: profile_pic, status: :created
    end

    private
    def profile_pic_params
        params.permit(:name, :user_id, :image)
    end
end
