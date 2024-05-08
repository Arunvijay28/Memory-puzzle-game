Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "sign_up",to:"registrations#new"

  post "sign_up", to: "registrations#create"

  delete "logout", to: "session#destroy"

  get "sign_in",to: "session#new"

  post "sign_in",to: "session#create"

  get "/index" , to:"selection#index"

  get "/card",to:"cardselection#game"

  get "/matrix" ,to:"matrix#matrix"

  get "/simon" , to:"simon#simon"

  get "/classic",to:"memorycard#card"

  get "/number",to:"memorycard#num"

  get "/alpha",to:"memorycard#alpha"

  root to: "main#index"

end
