class AboutController < ApplicationController
    require 'json'
    require 'typhoeus'

    def index
        username = "KingLegendary94"
        bearer_token = ENV.fetch("TWITTER_BEARER_TOKEN")
        response = user_lookup(bearer_token, username)
        res = JSON.parse(response.body)
        user_id = res["data"][0]["id"]

        new_res = spaces_lookup(bearer_token, user_id)
        data = JSON.parse(new_res.body)
        id = data["data"][0]["id"]
        url = "https://twitter.com/i/spaces/" + id
    end

    def user_lookup(bearer_token, username)
        user_lookup_url = "https://api.twitter.com/2/users/by"
        params = { "usernames": username, "user.fields": "name"}
        
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
        params = { "user_ids": user_id, "space.fields": "title,scheduled_start,started_at"}
        
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
end