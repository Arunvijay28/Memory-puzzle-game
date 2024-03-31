Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/", to:"login#login"
  
  get "/index" , to:"selection#index"

  get "/card",to:"memorycard#card"

  get "/matrix" ,to:"matrix#matrix"

  get "/simon" , to:"simon#simon"
end
