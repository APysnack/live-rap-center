Rails.application.routes.draw do
  require "sidekiq/web"

  mount ActionCable.server => "/cable"
  mount Sidekiq::Web => "/sidekiq"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  get "/report", to: "main#report"

  get "profile-picture", to: "profile_picture#index"
  post "profile-picture", to: "profile_picture#create"

  get "league-chat-message", to: "league_chat_message#index"
  post "league-chat-message", to: "league_chat_message#new"

  get "crew-chat-message", to: "crew_chat_message#index"
  post "crew-chat-message", to: "crew_chat_message#new"

  get "booking-chat-message", to: "booking_chat_message#index"
  post "booking-chat-message", to: "booking_chat_message#new"

  get "booking-chat-offer", to: "booking_chat_offer#index"
  post "booking-chat-offer", to: "booking_chat_offer#new"

  post "login", to: "sessions#new"
  post "logout", to: "sessions#destroy"

  get "spaces", to: "spaces#index"

  get "video", to: "videos#fetch_video"
  get "videos", to: "videos#fetch_videos"

  get "healthcheck", to: "main#health_check"

  root "main#index"
end
