require 'faker'

Fabricator(:battler) do
  name { Faker::Name.name }
end