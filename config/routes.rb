Rails.application.routes.draw do
  
  devise_for :usuarios
  #resources :posts
  get 'pages/home'
  root 'pages#inicio'
  get 'inicio', to: 'pages#inicio', as: :inicio

  devise_scope :usuario do
  	get 'registrar', to: 'devise/registrations#new', as: :registrar	
  	get 'iniciar', to: 'devise/sessions#new', as: :iniciar
  	get 'cerrar', to: 'devise/sessions#destroy', as: :cerrar
  end

  resources :posts
    get 'timeline', to: 'posts#index', as: :timeline
    root to: 'posts#inedex'

    get '/:id', to: 'perfil#show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
