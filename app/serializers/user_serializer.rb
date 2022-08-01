class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :email, :is_verified

  attribute :socials do |object|
    socials = {}
    object.social_media_links.each do | link |
      socials[link.social_media_platform.name] = { platform_id: link.social_media_platform.id, url: link.url }
    end
    socials

  end

  attribute :roles do |object|
    roles = []
    roles.concat(object.roles.map(&:name))
  end

  attribute :league_ids do |object|
    leagues = []
    leagues.concat(object.leagues.map(&:id))
  end

  attribute :voter_id do |object|
    object.voter_id
  end

  attribute :battler_id do |object|
    object.battler_id
  end
end
