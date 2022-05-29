# creating roles
role = Role.create(name: "battler")
role_2 = Role.create(name: "owner")
role_3 = Role.create(name: "film-maker")

# creating users
pete = User.create(username: "Pete", email: "petedavidson@gmail.com", password: "kanye")
hermione = User.create(username: "Hermione", email: "granger@gmail.com", password: "gryffindor")
purelyDef = User.create(username: "PurelyDef", email: "purleedef@gmail.com", password: "password")
organik = User.create(username: "Organik", email: "organik@gmail.com", password: "kingofthedot")
smack = User.create(username: "Smack", email: "smack@gmail.com", password: "ultimaterapleague")

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
battlerComa = Battler.create(name: "Coma")

# creating leagues
lrc = League.create(user_id: purelyDef.id, league_name: "Live Rap Circle", league_url: "https://www.youtube.com/channel/UCWseCA4XbP2PvjBox1u4C9g")
kotd = League.create(user_id: organik.id, league_name: "King of the Dot", league_url: "https://www.youtube.com/c/KingofthedotEntertainment")
url = League.create(user_id: smack.id, league_name: "Smack/URL", league_url: "https://www.youtube.com/c/theUrltv")

# creating battles
craniumVsDef = Battle.create(league_id: lrc.id, battle_url: "https://www.youtube.com/watch?v=jMt0E9OaiKo")
remydVsComa = Battle.create(league_id: lrc.id, battle_url: "https://www.youtube.com/watch?v=aPVZrMEYrR0")
Battle.create(league_id: lrc.id, battle_url: "https://www.youtube.com/watch?v=SiS7TkiO7sQ")
Battle.create(league_id: lrc.id, battle_url: "https://www.youtube.com/watch?v=2QDeROLwwR8")
Battle.create(league_id: lrc.id, battle_url: "https://www.youtube.com/watch?v=NQ2Jr3se3vk")
Battle.create(league_id: lrc.id, battle_url: "https://www.youtube.com/watch?v=R4MSPqc-5GA")

# creating battler/battle relationship
BattlerBattle.create(battler_id: battlerPurelyDef.id, battle_id: craniumVsDef.id)
BattlerBattle.create(battler_id: battlerRichardCranium.id, battle_id: craniumVsDef.id)

BattlerBattle.create(battler_id: battlerRemyD.id, battle_id: remydVsComa.id)
BattlerBattle.create(battler_id: battlerComa.id, battle_id: remydVsComa.id)


