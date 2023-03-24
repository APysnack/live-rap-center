# All other controllers inherit from this controlXler
class ApplicationController < ActionController::Base

    # tries to set user logged in before doing anything else
    before_action :authenticate_request!
    skip_before_action :verify_authenticity_token

    def authenticate_request!
      Current.user = nil 
      token = token_params[:token]
      
      return unless token 

      token_key_id = JWT.decode(token, nil, false).second["kid"]
      
      begin
        public_key = public_key_for(token_key_id)
        user_info = JWT.decode(token, public_key, true, { algorithm: 'RS256' }).first
        return unless ['https://accounts.google.com', 'accounts.google.com'].include? user_info['iss']
        
        user = User.find_by(email: user_info['email'])
        user = create_new_user_for(user_info['email']) unless user.present?
        Current.user = user

      rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError, NoMethodError => e
      end
    end

    private 
    def public_key_for(token_key_id)
      google_response = Typhoeus.get('https://www.googleapis.com/oauth2/v3/certs')
      response_body = JSON.parse(google_response.body)
      target_key = response_body["keys"].find { |k| k["kid"] == token_key_id }
      public_key = JWT::JWK::RSA.import(target_key).public_key  
    end

    def create_new_user_for(email)
      number = User.count + 1
      user = User.create!(username: "Tom Cruise Moms Shoes ##{number}", email: email, password: "password", is_verified: true)
      Location.create(user_id: user.id)
      user
    end

    def token_params
      params.permit(:token)
    end
end
