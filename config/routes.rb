Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  get '/current_user', to: 'current_user#index'

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  get "about", to: "about#index"

  get "password/reset", to: "password_resets#new"
  post "password/reset", to: "password_resets#create"

  get "password/reset/edit", to: "password_resets#edit"
  patch "password/reset/edit", to: "password_resets#update"

  get "profile-picture", to: "profile_picture#index"
  post "profile-picture", to: "profile_picture#create"

  get "league-chat-message", to: "league_chat_message#index"
  post "league-chat-message", to: "league_chat_message#new"

  root "main#index"
end
