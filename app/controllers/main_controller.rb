class MainController < ApplicationController
    def index
        @username = User.first.username
    end

    def health_check
        render json: { "foo": "bar" }, status: 200
    end
end