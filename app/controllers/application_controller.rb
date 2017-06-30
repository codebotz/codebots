class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  #Agregar before_action para obtener los ultimos,mejores articulos y tags para mostrarlos en los parciales
  before_action :ultimos_articulos, :nueve_articulos, :mejores_articulos
  before_action :configure_permited_parameters,  if: :devise_controller?

  protected

	def configure_permited_parameters
		#devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:nombre, :apellido, :nickname, :email, :password, :password_confirmation)}
		devise_parameter_sanitizer.permit(:sign_up, keys: [:nombre, :apellido, :nickname, :email, :password, :password_confirmation])
	end

	#Ultimos articulos mostrados en el aside
	def ultimos_articulos
		puts "\nObteniendo datos de bd..."
	    @uarticulos = Articulo.limit(3).order(created_at: :desc)
	end

	def nueve_articulos
		@iarticulos = Articulo.limit(9).order(created_at: :desc)		
	end
	
	def mejores_articulos
		@marticulos = Articulo.limit(4).order(created_at: :desc)		
	end
end
