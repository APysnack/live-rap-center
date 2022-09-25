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
purelyDef = User.create(username: "PurelyDef", email: "apysnack@gmail.com", password: "password", is_verified: true, vip_status: true)
Location.create(user_id: purelyDef.id)
secondUserTest = User.create(username: "Real User For Testing", email: "purleedef@gmail.com", password: "password", is_verified: true, vip_status: true)
Location.create(user_id: secondUserTest.id)
organik = User.create(username: "Organik", email: "organik@gmail.com", password: "kingofthedot", is_verified: true, vip_status: true)
Location.create(user_id: organik.id)
smack = User.create(username: "Smack", email: "smack@gmail.com", password: "ultimaterapleague", is_verified: true)
Location.create(user_id: smack.id)
patStay = User.create(username: "Pat", email: "pat@gmail.com", password: "patstay", is_verified: true, vip_status: true)
Location.create(user_id: patStay.id, country: "Canada", region: "Nova Scotia")

# Assigning roles
UserRole.create(user_id: purelyDef.id, role_id: role.id)
UserRole.create(user_id: purelyDef.id, role_id: role_2.id)
UserRole.create(user_id: purelyDef.id, role_id: role_3.id)
UserRole.create(user_id: purelyDef.id, role_id: role_5.id)

UserRole.create(user_id: secondUserTest.id, role_id: role.id)
UserRole.create(user_id: secondUserTest.id, role_id: role_2.id)
UserRole.create(user_id: secondUserTest.id, role_id: role_3.id)
UserRole.create(user_id: secondUserTest.id, role_id: role_5.id)

UserRole.create(user_id: organik.id, role_id: role.id)
UserRole.create(user_id: organik.id, role_id: role_2.id)

UserRole.create(user_id: patStay.id, role_id: role.id)

BattlerBookingOffer.create(battler_user_id: purelyDef.id, booker_user_id: secondUserTest.id, number_of_rounds: 1, minutes_per_round: 5, amount_offered: 500, comments: "N/A", date: Time.now)

# creating leagues
lrc = League.create(league_name: "Live Rap Circle", league_url: "UCWseCA4XbP2PvjBox1u4C9g")
kotd = League.create(league_name: "King of the Dot", league_url: "UCIuFtIO8i_XqA8lM7q4B1FQ")
showtime = League.create(league_name: "Showtime Battle Arena", league_url: "UCkb4L-6YsUhocxB-WFwmQ2A")
iBattle = League.create(league_name: "iBattle", league_url: "UCcn1FcR6MoWhnZ0gfH2dVJw")

# assigning league admins
LeagueAdmin.create(league_id: lrc.id, user_id: purelyDef.id)

# creating battlers
battlerPurelyDef = Battler.create(user_id: purelyDef.id, name: "PurelyDef")
battlerRichardCranium = Battler.create(name: "Richard Cranium")
battlerRemyD = Battler.create(name: "RemyD")
battlerKavemanBrown = Battler.create(name: "Kaveman Brown")
battlerFloLeeds = Battler.create(name: "Flo Leeds")
battlerReggieLoud = Battler.create(name: "Reginald Loud", league_id: lrc.id)
battlerComa = Battler.create(name: "Coma")
battlerCodes = Battler.create(name: "Codes")
battlerSK = Battler.create(name: "SK")
battler3rdDegree = Battler.create(name: "3rd Degree", league_id: lrc.id)
battlerBrotherPhil = Battler.create(name: "Brother Phil")
battlerBigAnt = Battler.create(name: "Big Ant")
battlerPatStay = Battler.create(user_id: patStay.id, name: "Pat Stay", league_id: kotd.id)
battlerLux = Battler.create(name: "Loaded Lux")
battlerGeech = Battler.create(name: "Geechi Gotti")
battlerArsonal = Battler.create(name: "Arsonal")
battlerMac = Battler.create(name: "Mac the Captain")
battlerFebou = Battler.create(name: "Febou")

LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: lrc.id)
LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: kotd.id)

# creating chat components
lrcChat = LeagueChat.create(league_id: lrc.id)
LeagueChatUser.create(league_chat_id:  lrcChat.id, user_id: smack.id)

kotdChat = LeagueChat.create(league_id: kotd.id)
LeagueChatUser.create(league_chat_id: kotdChat.id, user_id: patStay.id)
LeagueChatUser.create(league_chat_id:  kotdChat.id, user_id: organik.id)

LeagueChatMessage.create(league_chat_id: lrcChat.id, user_id: smack.id, body: "welcome to LRC")
LeagueChatMessage.create(league_chat_id: lrcChat.id, user_id: smack.id, body: "A second lrc message")

LeagueChatMessage.create(league_chat_id: kotdChat.id, user_id: patStay.id, body: "welcome to KOTD")
LeagueChatMessage.create(league_chat_id: kotdChat.id, user_id: organik.id, body: "sup")

testingCrew = Crew.create(name: "testing", user_id: purelyDef.id)
testingCrewChat = CrewChat.create(crew_id: testingCrew.id)
CrewUser.create(crew_id: testingCrew.id, user_id: purelyDef.id)
CrewChatUser.create(crew_chat_id: testingCrewChat.id, user_id: purelyDef.id)
CrewChatUser.create(crew_chat_id:  testingCrewChat.id, user_id: organik.id)

CrewChatMessage.create(crew_chat_id: testingCrewChat.id, user_id: organik.id, body: "hey")
CrewChatMessage.create(crew_chat_id: testingCrewChat.id, user_id: purelyDef.id, body: "sup")

#pending crew invitation
CrewInvitation.create(user_id: secondUserTest.id, crew_id: testingCrew.id)

# creating battles
craniumVsDef = Battle.create(league_id: lrc.id, battle_url: "jMt0E9OaiKo", event_id: 1)
brotherPhilVsDef = Battle.create(league_id: showtime.id, battle_url: "UE044GrYSXo")
antVsDef = Battle.create(league_id: lrc.id, battle_url: "-EjyQarYyyk")
remydVsComa = Battle.create(league_id: lrc.id, battle_url: "aPVZrMEYrR0")
skVs3rdDegree = Battle.create(league_id: lrc.id, battle_url: "2QDeROLwwR8", event_id: 1)
reggieVs3rdDegree = Battle.create(league_id: lrc.id, battle_url: "_Uivyl1veQ8")
kaveVsFloLeeds = Battle.create(league_id: lrc.id, battle_url: "NQ2Jr3se3vk")
codesVsComa = Battle.create(league_id: lrc.id, battle_url: "SiS7TkiO7sQ", event_id: 1)

luxVsGeechi = Battle.create(league_id: kotd.id, battle_url: "6cr0idmmSrs")
febouVsMac = Battle.create(league_id: iBattle.id, battle_url: "v6gJhMQ0chU")

# creating battler/battle relationship
BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: craniumVsDef.id)
BattlerBattle.create(battler_id: battlerRichardCranium.id, battle_id: craniumVsDef.id)

BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: brotherPhilVsDef.id)
BattlerBattle.create(battler_id: battlerBrotherPhil.id, battle_id: brotherPhilVsDef.id)

BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: antVsDef.id)
BattlerBattle.create(battler_id: battlerBigAnt.id, battle_id: antVsDef.id)

BattlerBattle.create(battler_id: battlerRemyD.id, battle_id: remydVsComa.id)
BattlerBattle.create(battler_id: battlerComa.id, battle_id: remydVsComa.id)

BattlerBattle.create(battler_id: battlerSK.id, battle_id: skVs3rdDegree.id)
BattlerBattle.create(battler_id: battler3rdDegree.id, battle_id: skVs3rdDegree.id)

BattlerBattle.create(battler_id: battlerReggieLoud.id, battle_id: reggieVs3rdDegree.id)
BattlerBattle.create(battler_id: battler3rdDegree.id, battle_id: reggieVs3rdDegree.id)

BattlerBattle.create(battler_id: battlerKavemanBrown.id, battle_id: kaveVsFloLeeds.id)
BattlerBattle.create(battler_id: battlerFloLeeds.id, battle_id: kaveVsFloLeeds.id)

BattlerBattle.create(battler_id: battlerCodes.id, battle_id: codesVsComa.id)
BattlerBattle.create(battler_id: battlerComa.id, battle_id: codesVsComa.id)

BattlerBattle.create(battler_id: battlerLux.id, battle_id: luxVsGeechi.id)
BattlerBattle.create(battler_id: battlerGeech.id, battle_id: luxVsGeechi.id)

BattlerBattle.create(battler_id: battlerFebou.id, battle_id: febouVsMac.id)
BattlerBattle.create(battler_id: battlerMac.id, battle_id: febouVsMac.id)

# BattlerFollow.create(user_id: purelyDef.id, battler_id: battlerComa.id)
BattlerFollow.create(user_id: purelyDef.id, battler_id: battlerPatStay.id)
BattlerFollow.create(user_id: purelyDef.id, battler_id: battler3rdDegree.id)

lrcEvent1 = Event.create(name: "LRC 1", admission_cost: 20, league_id: lrc.id, address: "123 Street", date: Time.now)
Location.create(event_id: lrcEvent1.id)
lrcEvent3 = Event.create(name: "LRC 3", admission_cost: 50, league_id: lrc.id, address: "TBA", date: Time.now)
Location.create(event_id: lrcEvent3.id)

defVsPat = Battle.create(league_id: lrc.id, battle_status: :prospective)

BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: defVsPat.id)
BattlerBattle.create(battler_id: battlerPatStay.id, battle_id: defVsPat.id)

# vote creation
purelyDefVoter = Voter.create(user_id: purelyDef.id)

# creating SocialMediaLinks
SocialMediaLink.create(user_id: purelyDef.id, url: "https://facebook.com/purleedef", social_media_platform_id: fb.id)
SocialMediaLink.create(user_id: purelyDef.id , url: "https://instagram.com/purelydef", social_media_platform_id: ig.id)

SocialMediaLink.create(user_id: patStay.id , url: "twitter.com/ehart914", social_media_platform_id: twitter.id)

SocialMediaLink.create(user_id: organik.id , url: "twitter.com/therevronhunt", social_media_platform_id: twitter.id)