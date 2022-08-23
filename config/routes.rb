Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  get "profile-picture", to: "profile_picture#index"
  post "profile-picture", to: "profile_picture#create"

  get "league-chat-message", to: "league_chat_message#index"
  post "league-chat-message", to: "league_chat_message#new"

  get "crew-chat-message", to: "crew_chat_message#index"
  post "crew-chat-message", to: "crew_chat_message#new"

  post "login", to: "sessions#new"
  post "logout", to: "sessions#destroy"

  root "main#index"
end
