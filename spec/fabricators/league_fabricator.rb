require 'faker'

Fabricator(:league) do
  league_name { Faker::Sports::Football.team } 
  league_url { Faker::Internet.url }
  created_at { Faker::Date.between(from: 1.year.ago, to: Date.today) }
  updated_at { Faker::Date.between(from: 1.year.ago, to: Date.today) }
  videos_initialized { [true, false].sample } 
  last_video_fetch_date { Faker::Date.between(from: 1.week.ago, to: Date.today) }
end