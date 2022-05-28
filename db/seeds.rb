5.times do
    user = User.create(username: Faker::Name.name, email: Faker::Internet.email, password: Faker::Internet.password)
    1.times do
        League.create(user_id: user.id, league_name: Faker::Name.name)
    end
end