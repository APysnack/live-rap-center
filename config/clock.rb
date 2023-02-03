require_relative './boot'
require_relative './environment'

require 'rubygems'
require 'clockwork'
module Clockwork
  EASTERN_TIME = 'America/New_York'

  configure do |config|
    config[:sleep_timeout] = 5
    config[:tz] = EASTERN_TIME
    config[:max_threads] = 15
    config[:thread] = true
  end

  every(4.hours, 'Fetch New Videos') {
    `rake fetch_new_videos`
  }

  every(1.day, 'Update League Scores') {
    `rake update_league_scores`
  }
end
