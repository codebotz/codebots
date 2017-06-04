Rails.application.routes.draw do
  
  resources :estados
  get 'perfil/show'

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

    #Para mostrar los resultados de búsqueda
    post 'busqueda', to: 'pages#search', as: :busqueda
    #Para ir a perfil propio
    get 'home', to: 'pages#home'
    #Para mostrar el perfil del usuario
    get '/:id', to: 'pages#show'

    post 'posts/like', to: 'posts#like'

    

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
