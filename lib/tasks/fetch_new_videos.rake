require 'typhoeus'
require 'battle_parser'

include BattleParser


# in the future, might be a good idea to rewrite this so we're fetching multiple channel ids rather than one at a time
# programmed it this way because of the disconnect between how youtube api wants the info (as a CSV string) and the need
# to extract league id and other information in a normal loop fashion. 
task fetch_new_videos: :environment do 
  fetch_all_videos = false

  league = League.find_by(league_name: "iBattle")

    # concatenates all league ids into a string "id1,id2,id3" as required by youtube api
    channel_id = league.league_url

    # gets all playlist ids from the aforementioned league channels in the same format of "id1,id2,id3"
    # currently only gets one playlist id, will need to modify to get multiple ids at once
    playlist_id = fetch_playlist_ids_from_channel_ids(channel_id)

    # gets all videos for the playlist
    response  = fetch_videos_from_playlist(playlist_id, nil)

    videos = response["items"]

    # loops through each video in the playlist
    videos.each do | video | 
      video_id = video["snippet"]["resourceId"]["videoId"]

      # parses the battler names into an array ["battler1Name", "battler2Name"]
      battler_names = BattleParser.trailing_dash_format(video["snippet"]["title"])

      if battler_names.length > 0
        battle_object = Battle.create(league_id: league.id, battle_url: video_id)

        # array of battler objects participating in the battle
        battlers = []

        # adds battler to the db when not found
        battler_names.each do |battler_name|
          battler = Battler.find_by(name: battler_name)
          if battler.nil?
            battlers.push(Battler.create(name: battler_name))
          else 
            battlers.push(battler)
          end
        end

        battlers.each do | battler_object |
          BattlerBattle.create(battler_id: battler_object.id, battle_id: battle_object.id)
        end


        # youtube has a max of 50 video retrievals, requires a nextPageToken to paginate through ALL results
        if fetch_all_videos
          until response["nextPageToken"].nil? do 
            response  = fetch_videos_from_playlist(playlist_id, response["nextPageToken"])
          end  
        end
      end
    end
end

def fetch_playlist_ids_from_channel_ids(all_channel_ids)
  channel_api_url = ENV.fetch("YT_CHANNEL_API") + "?key=" + ENV.fetch("YT_API_KEY")
  payload = { "id": all_channel_ids, "part": "contentDetails" }
  
  options = {
    method: 'get',
    params: payload
  }

  request = Typhoeus::Request.new(channel_api_url, options).run
  response = JSON.parse(request.body)
  
  response["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
end


def fetch_videos_from_playlist(playlist_id, nextPageToken)
  unless nextPageToken.present?
    payload = { "playlistId": playlist_id, "maxResults": 50, "part": "snippet" }
  else
    payload = { "playlistId": playlist_id, "pageToken": nextPageToken, "maxResults": 50, "part": "snippet" }
  end
  playlist_api_url = ENV.fetch("YT_PLAYLIST_API") + "?key=" + ENV.fetch("YT_API_KEY")
  
  options = {
    method: 'get',
    params: payload
  }

  request = Typhoeus::Request.new(playlist_api_url, options).run
  return response = JSON.parse(request.body)
end