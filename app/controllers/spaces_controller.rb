class SpacesController < ApplicationController
    require 'json'
    require 'typhoeus'

    def index
      begin
        twitter_id = SocialMediaPlatform.find_by(name: "Twitter")
        links = SocialMediaLink.joins(:user).where(social_media_platform_id: twitter_id, :user => { vip_status: true})
        users = ""
        links.each do |link|
          username = remove_substring(link.url)
          users += username + ","
        end
        bearer_token = ENV.fetch("TWITTER_BEARER_TOKEN")
        twitter_user_response = user_lookup(bearer_token, users.chop!)
        twitter_accounts = JSON.parse(twitter_user_response.body)
        twitter_ids = ""
        twitter_accounts["data"].each do |account|
          twitter_ids += account["id"] + ","
        end
        twitter_space_response = spaces_lookup(bearer_token, twitter_ids.chop!)
        spaces = JSON.parse(twitter_space_response.body)
        render json: spaces, status: :ok
      rescue
        result = { spaces: [] }
        render json: result, status: :ok
      end
    end

    def user_lookup(bearer_token, usernames)
        user_lookup_url = "https://api.twitter.com/2/users/by"
        params = { "usernames": usernames, "user.fields": "name"}
        
        options = {
          method: 'get',
          headers: {
            "User-Agent": "v2UserLookupRuby",
            "Authorization": "Bearer #{bearer_token}"
          },
          params: params
        }

        request = Typhoeus::Request.new(user_lookup_url, options)
        response = request.run

        return response
    end      

    def spaces_lookup(bearer_token, user_id)
        space_lookup_url = "https://api.twitter.com/2/spaces/by/creator_ids"
        params = { "user_ids": user_id, "space.fields": "title,scheduled_start,started_at,participant_count"}
        
        options = {
          method: 'get',
          headers: {
            "User-Agent": "v2UserLookupRuby",
            "Authorization": "Bearer #{bearer_token}"
          },
          params: params
        }

        request = Typhoeus::Request.new(space_lookup_url, options)
        response = request.run

        return response
    end 


    # uses regex to remove twitter url prefix from string
    def remove_substring(str)
      replacement_rules = {
        'https://twitter.com/': '',
        'http://twitter.com/': '',
        'twitter.com/': '',
        'www.twitter.com/': '',
        'https://www.twitter.com/': '',
        'http://www.twitter.com/': '',
      }
      matcher = /#{replacement_rules.keys.join('|')}/
      str.gsub(matcher, replacement_rules)
    end
end