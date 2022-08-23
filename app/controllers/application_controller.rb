# All other controllers inherit from this controller
class ApplicationController < ActionController::Base

    # tries to set user logged in before doing anything else
    before_action :authenticate_request!
    skip_before_action :verify_authenticity_token

    def authenticate_request!
        # library that decodes google id token received from login component
        googleIdTokenValidator = GoogleIDToken::Validator.new
        # payload contains user name/email/etc. from google, verifies signature is valid
        payload = googleIdTokenValidator.check(params[:token], ENV.fetch('GOOGLE_CLIENT_ID'))
        # ensures the issuer information hasnt been tampered with
        if ['https://accounts.google.com', 'accounts.google.com'].include? payload['iss']
          user = User.find_by(email: payload['email'])
          # creates user if theyre not already registered
          if !user.present?
            number = User.count + 1
            user = User.create!(username: "Tom Cruise Moms Shoes ##{number}", email: payload['email'], password: "password", is_verified: true)
            puts user['email']
          end
          Current.user = user
        else 
          Current.user = nil
        end
      rescue
        Current.user = nil
    end
end
