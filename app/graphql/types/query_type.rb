module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :users, [Types::UserType], null: false
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    field :leagues, [Types::LeagueType], null: false
    field :league, Types::LeagueType, null: false do
      argument :id, ID, required: true
    end

    field :battles, [Types::BattleType], null: false
    field :battle, Types::BattleType, null: false do
      argument :id, ID, required: true
    end

    field :battlers, [Types::BattlerType], null: false
    field :battler, Types::BattlerType, null: false do
      argument :id, ID, required: false
      argument :user_id, ID, required: false
    end

    field :roles, [Types::RoleType], null: false
    field :role, Types::RoleType, null: false do
      argument :id, ID, required: true
    end


    field :socialMediaLinks, [Types::SocialMediaLinkType], null: false
    field :socialMediaLink, Types::SocialMediaLinkType, null: false do
      argument :id, ID, required: true
    end

    field :socialMediaPlatforms, [Types::SocialMediaPlatformType], null: false
    field :socialMediaPlatform, Types::SocialMediaPlatformType, null: false do
      argument :id, ID, required: true
    end

    def users
      User.all
    end

    def user(id:)
      User.find_by(id: id)
    end

    def leagues
      League.all
    end

    def league(id:)
      League.find_by(id: id)
    end

    def battles
      Battle.all
    end

    def battle(id:)
      Battle.find_by(id: id)
    end


    def battlers
      Battler.all
    end

    def battler(id: nil, user_id: nil)
      if user_id.present?
        Battler.find_by(user_id: user_id)
      else
        Battler.find_by(id: id)
      end
    end

    def roles
      Role.all
    end

    def role(id:)
      Role.find_by(id: id)
    end

    def socialMediaLinks
      SocialMediaLink.all
    end

    def socialMediaLink(id:)
      SocialMediaLink.find_by(id: id)
    end

    def socialMediaPlatforms
      SocialMediaPlatform.all
    end

    def socialMediaPlatform(id:)
      SocialMediaPlatform.find_by(id: id)
    end
  end
end
