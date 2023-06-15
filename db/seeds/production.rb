require 'csv'

# creating roles
role = Role.create(name: "battler")
role_2 = Role.create(name: "league owner")
role_3 = Role.create(name: "film maker")
role_4 = Role.create(name: "voter")
role_5 = Role.create(name: "admin")

# creating SocialMediaPlatforms
fb = SocialMediaPlatform.create(name: "Facebook")
ig = SocialMediaPlatform.create(name: "Instagram")
twitter = SocialMediaPlatform.create(name: "Twitter")
SocialMediaPlatform.create(name: "SoundCloud")

# creating users
# IMPORTANT NOTE: a location model should be created when a user or event is created as shown below
purelyDef = User.create(username: "PurelyDef", email: "apysnack@gmail.com", password: "thisisntevenused", is_verified: true, vip_status: true)
Location.create(user_id: purelyDef.id)

# Assigning roles
UserRole.create(user_id: purelyDef.id, role_id: role.id)
UserRole.create(user_id: purelyDef.id, role_id: role_2.id)
UserRole.create(user_id: purelyDef.id, role_id: role_3.id)
UserRole.create(user_id: purelyDef.id, role_id: role_5.id)

# creating leagues
lrc = League.create(league_name: "Live Rap Circle", league_url: "UCWseCA4XbP2PvjBox1u4C9g")
LeagueChat.create(league_id: lrc.id)

csv_path = File.join(Rails.root, 'db', 'seeds', 'leagues.csv')

# NOTE: change development.rb config.active_storage.service to :amazon for s3 uploads
CSV.foreach(csv_path, headers: true) do |row|
  league = League.create(league_name: row['league_name'], league_url: row['league_url'])
  LeagueChat.create(league_id: league.id)
  if row['logo_name']
    file_path = Rails.root.join('app', 'assets', 'images', 'logos', "#{row['logo_name']}.jpg")
    if File.exist?(file_path)
      file = File.open(file_path)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: file,
        filename: row['logo_name'],
        content_type: 'image/jpeg'
      )
      league.image = blob
      league.save
    end
  end
end

# assigning league admins
LeagueAdmin.create(league_id: lrc.id, user_id: purelyDef.id)

# creating battlers
battlerPurelyDef = Battler.create(user_id: purelyDef.id, name: "PurelyDef")

# creating chat components
lrcChat = LeagueChat.create(league_id: lrc.id)
LeagueChatUser.create(league_chat_id:  lrcChat.id, user_id: purelyDef.id)

purelyDefVoter = Voter.create(user_id: purelyDef.id)

# creating SocialMediaLinks
SocialMediaLink.create(user_id: purelyDef.id, url: "https://facebook.com/purleedef", social_media_platform_id: fb.id)
SocialMediaLink.create(user_id: purelyDef.id , url: "https://instagram.com/purelydef", social_media_platform_id: ig.id)