Rails.application.routes.draw do

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

  get "/dashboard",to:"main#dashboard"

  get "/maze",to:"maze#index"

  get "run_script",to:"maze#run_script"

  post "record_audio",to:"maze#record_audio"

  root to: "main#index"

end
