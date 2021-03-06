# creating roles
role = Role.create(name: "battler")
role_2 = Role.create(name: "league owner")
role_3 = Role.create(name: "film maker")
role_4 = Role.create(name: "voter")
role_5 = Role.create(name: "admin")

# creating SocialMediaPlatforms
fb = SocialMediaPlatform.create(name: "Facebook")
ig = SocialMediaPlatform.create(name: "Instagram")
SocialMediaPlatform.create(name: "Twitter")
SocialMediaPlatform.create(name: "SoundCloud")

# creating users
purelyDef = User.create(username: "PurelyDef", email: "purleedef@gmail.com", password: "password", is_verified: true)
organik = User.create(username: "Organik", email: "organik@gmail.com", password: "kingofthedot", is_verified: true)
smack = User.create(username: "Smack", email: "smack@gmail.com", password: "ultimaterapleague", is_verified: true)

# Assigning roles
UserRole.create(user_id: purelyDef.id, role_id: role.id)
UserRole.create(user_id: purelyDef.id, role_id: role_2.id)
UserRole.create(user_id: purelyDef.id, role_id: role_3.id)
UserRole.create(user_id: purelyDef.id, role_id: role_5.id)

UserRole.create(user_id: organik.id, role_id: role.id)
UserRole.create(user_id: organik.id, role_id: role_2.id)

# creating leagues
lrc = League.create(league_name: "Live Rap Circle", league_url: "UCWseCA4XbP2PvjBox1u4C9g")
kotd = League.create(league_name: "King of the Dot", league_url: "UCIuFtIO8i_XqA8lM7q4B1FQ")
url = League.create(league_name: "Smack/URL", league_url: "UCflIAeM03JFL9ml03LwYF-g")
showtime = League.create(league_name: "Showtime Battle Arena", league_url: "UCkb4L-6YsUhocxB-WFwmQ2A")
iBattle = League.create(league_name: "iBattle", league_url: "UCcn1FcR6MoWhnZ0gfH2dVJw")

# assigning league admins
LeagueAdmin.create(league_id: lrc.id, user_id: purelyDef.id)

# creating battlers
battlerPurelyDef = Battler.create(user_id: purelyDef.id, name: "PurelyDef", score: 100)
battlerRichardCranium = Battler.create(name: "Richard Cranium", score: 93)
battlerRemyD = Battler.create(name: "RemyD", score: 88)
battlerKavemanBrown = Battler.create(name: "Kaveman Brown", score: 86)
battlerFloLeeds = Battler.create(name: "Flo Leeds")
battlerReggieLoud = Battler.create(name: "Reginald Loud", league_id: lrc.id)
battlerComa = Battler.create(name: "Coma")
battlerSK = Battler.create(name: "SK")
battler3rdDegree = Battler.create(name: "3rd Degree", league_id: lrc.id)
battlerBrotherPhil = Battler.create(name: "Brother Phil")
battlerBigAnt = Battler.create(name: "Big Ant")

LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: lrc.id)
LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: kotd.id)
LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: url.id)
LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: iBattle.id)
LeagueInvitation.create(battler_id: battlerPurelyDef.id, league_id: showtime.id)

# creating battles
craniumVsDef = Battle.create(league_id: lrc.id, battle_url: "jMt0E9OaiKo")
brotherPhilVsDef = Battle.create(league_id: showtime.id, battle_url: "UE044GrYSXo")
antVsDef = Battle.create(league_id: lrc.id, battle_url: "-EjyQarYyyk")
remydVsComa = Battle.create(league_id: lrc.id, battle_url: "aPVZrMEYrR0")
skVs3rdDegree = Battle.create(league_id: lrc.id, battle_url: "2QDeROLwwR8")
kaveVsFloLeeds = Battle.create(league_id: lrc.id, battle_url: "NQ2Jr3se3vk")
reggieVs3rdDegree = Battle.create(league_id: lrc.id, battle_url: "_Uivyl1veQ8")
codesVsComa = Battle.create(league_id: lrc.id, battle_url: "SiS7TkiO7sQ")
Battle.create(league_id: kotd.id, battle_url: "6cr0idmmSrs")
Battle.create(league_id: url.id, battle_url: "R4MSPqc-5GA")
Battle.create(league_id: showtime.id, battle_url: "UE044GrYSXo")
Battle.create(league_id: iBattle.id, battle_url: "mq400yVwNUk")

# creating battler/battle relationship
BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: craniumVsDef.id)
BattlerBattle.create(battler_id: battlerRichardCranium.id, battle_id: craniumVsDef.id)

BattlerBattle.create(battler_id: battlerRemyD.id, battle_id: remydVsComa.id)
BattlerBattle.create(battler_id: battlerComa.id, battle_id: remydVsComa.id)

BattlerBattle.create(battler_id: battlerSK.id, battle_id: skVs3rdDegree.id)
BattlerBattle.create(battler_id: battler3rdDegree.id, battle_id: skVs3rdDegree.id)

BattlerBattle.create(battler_id: battlerReggieLoud.id, battle_id: reggieVs3rdDegree.id)
BattlerBattle.create(battler_id: battler3rdDegree.id, battle_id: reggieVs3rdDegree.id)

BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: brotherPhilVsDef.id)
BattlerBattle.create(battler_id: battlerBrotherPhil.id, battle_id: brotherPhilVsDef.id)

BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: antVsDef.id)
BattlerBattle.create(battler_id: battlerBigAnt.id, battle_id: antVsDef.id)

# creating SocialMediaLinks
SocialMediaLink.create(user_id: purelyDef.id, url: "https://facebook.com/purleedef", social_media_platform_id: fb.id)
SocialMediaLink.create(user_id: purelyDef.id , url: "https://instagram.com/purelydef", social_media_platform_id: ig.id)