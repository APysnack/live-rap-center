# creating roles
role = Role.create(name: "battler")
role_2 = Role.create(name: "owner")
role_3 = Role.create(name: "film-maker")
role_4 = Role.create(name: "voter")

# creating users
purelyDef = User.create(username: "PurelyDef", email: "purleedef@gmail.com", password: "password", is_verified: true)
organik = User.create(username: "Organik", email: "organik@gmail.com", password: "kingofthedot", is_verified: true)
smack = User.create(username: "Smack", email: "smack@gmail.com", password: "ultimaterapleague", is_verified: true)

# Assigning roles
UserRole.create(user_id: purelyDef.id, role_id: role.id)
UserRole.create(user_id: purelyDef.id, role_id: role_2.id)
UserRole.create(user_id: purelyDef.id, role_id: role_3.id)

UserRole.create(user_id: organik.id, role_id: role.id)
UserRole.create(user_id: organik.id, role_id: role_2.id)

# creating battlers
battlerPurelyDef = Battler.create(name: "PurelyDef")
battlerRichardCranium = Battler.create(name: "Richard Cranium")
battlerRemyD = Battler.create(name: "RemyD")
battlerKavemanBrown = Battler.create(name: "Kaveman Brown")
battlerFloLeeds = Battler.create(name: "Flo Leeds")
battlerReggieLoud = Battler.create(name: "Reginald Loud")
battlerComa = Battler.create(name: "Coma")
battlerSK = Battler.create(name: "SK")
battler3rdDegree = Battler.create(name: "3rd Degree")

# create UserBattlers
UserBattler.create(user_id: purelyDef.id, battler_id: battlerPurelyDef.id)

# creating leagues
lrc = League.create(user_id: purelyDef.id, league_name: "Live Rap Circle", league_url: "https://www.youtube.com/channel/UCWseCA4XbP2PvjBox1u4C9g")
kotd = League.create(user_id: organik.id, league_name: "King of the Dot", league_url: "https://www.youtube.com/c/KingofthedotEntertainment")
url = League.create(user_id: smack.id, league_name: "Smack/URL", league_url: "https://www.youtube.com/c/theUrltv")

# creating battles
craniumVsDef = Battle.create(league_id: lrc.id, battle_url: "jMt0E9OaiKo")
remydVsComa = Battle.create(league_id: lrc.id, battle_url: "aPVZrMEYrR0")
skVs3rdDegree = Battle.create(league_id: lrc.id, battle_url: "2QDeROLwwR8")
kaveVsFloLeeds = Battle.create(league_id: lrc.id, battle_url: "NQ2Jr3se3vk")
reggieVs3rdDegree = Battle.create(league_id: lrc.id, battle_url: "_Uivyl1veQ8")
codesVsComa = Battle.create(league_id: lrc.id, battle_url: "SiS7TkiO7sQ")
Battle.create(league_id: kotd.id, battle_url: "R4MSPqc-5GA")

# creating battler/battle relationship
BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: craniumVsDef.id)
BattlerBattle.create(battler_id: battlerRichardCranium.id, battle_id: craniumVsDef.id)

BattlerBattle.create(battler_id: battlerRemyD.id, battle_id: remydVsComa.id)
BattlerBattle.create(battler_id: battlerComa.id, battle_id: remydVsComa.id)

BattlerBattle.create(battler_id: battlerSK.id, battle_id: skVs3rdDegree.id)
BattlerBattle.create(battler_id: battler3rdDegree.id, battle_id: skVs3rdDegree.id)

BattlerBattle.create(battler_id: battlerReggieLoud.id, battle_id: reggieVs3rdDegree.id)
BattlerBattle.create(battler_id: battler3rdDegree.id, battle_id: reggieVs3rdDegree.id)