role = Role.create(name: "battler")
role_2 = Role.create(name: "owner")
role_3 = Role.create(name: "film-maker")

User.create(username: "Pete", email: "petedavidson@gmail.com", password: "kanye")

User.create(username: "Hermione", email: "granger@gmail.com", password: "gryffindor")

purelyDef = User.create(username: "PurelyDef", email: "purleedef@gmail.com", password: "password")
league = League.create(user_id: purelyDef.id, league_name: "Live Rap Circle", league_url: "https://www.youtube.com/channel/UCWseCA4XbP2PvjBox1u4C9g")

UserRole.create(user_id: purelyDef.id, role_id: role.id)
UserRole.create(user_id: purelyDef.id, role_id: role_2.id)
UserRole.create(user_id: purelyDef.id, role_id: role_3.id)

Battle.create(user_id: purelyDef.id, league_id: league.id, battle_url: "https://www.youtube.com/watch?v=jMt0E9OaiKo")
Battle.create(league_id: league.id, battle_url: "https://www.youtube.com/watch?v=aPVZrMEYrR0")
Battle.create(league_id: league.id, battle_url: "https://www.youtube.com/watch?v=SiS7TkiO7sQ")
Battle.create(league_id: league.id, battle_url: "https://www.youtube.com/watch?v=2QDeROLwwR8")
Battle.create(league_id: league.id, battle_url: "https://www.youtube.com/watch?v=NQ2Jr3se3vk")

user = User.create(username: "Organik", email: "organik@gmail.com", password: "kingofthedot")
League.create(user_id: user.id, league_name: "King of the Dot", league_url: "https://www.youtube.com/c/KingofthedotEntertainment")
Battle.create(league_id: league.id, battle_url: "https://www.youtube.com/watch?v=R4MSPqc-5GA")

user = User.create(username: "Smack", email: "smack@gmail.com", password: "ultimaterapleague")
League.create(user_id: user.id, league_name: "Smack/URL", league_url: "https://www.youtube.com/c/theUrltv")

