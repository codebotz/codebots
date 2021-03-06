class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  #Agregar before_action para obtener los ultimos,mejores articulos y tags para mostrarlos en los parciales
  before_action :ultimos_articulos, :nueve_articulos, :mejores_articulos, :articulos_pos_categoria
  before_action :configure_permited_parameters,  if: :devise_controller?

  protected

	def configure_permited_parameters
		#devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:nombre, :apellido, :nickname, :email, :password, :password_confirmation)}
		devise_parameter_sanitizer.permit(:sign_up, keys: [:nombre, :apellido, :nickname, :email, :password, :password_confirmation])
	end

	#Ultimos articulos mostrados en el aside
	def ultimos_articulos
		puts "\nApplication_controller: [Obteniendo articulos aside]"
	    @uarticulos = Articulo.limit(3).order(created_at: :desc)
	end

	def nueve_articulos
		puts "\nApplication_controller: [Obteniendo articulos inicio]"
		@iarticulos = Articulo.limit(9).order(created_at: :desc)		
		@iarticulos.each do |articulo|
	      articulo.like = Like.where(articulo_id: articulo.id).count
	    end
	end
	
	def mejores_articulos
		puts "\nApplication_controller: [Obteniendo articulos footer]"
		@marticulos = Articulo.limit(4).order(like: :desc,created_at: :desc)
		#@marticulos = Articulo.where(:id [Like.limit(4).group(:articulo_id).count])
							  
	end

	def articulos_pos_categoria
		@articulosRuby = Articulo.where("categoria = ?", "ruby").count
		@articulosJava = Articulo.where("categoria = ?", "java").count
		@articulosTesting = Articulo.where("categoria = ?", "testing").count
		@articulosWeb = Articulo.where("categoria = ?", "web").count
		@articulosTecnologia = Articulo.where("categoria = ?", "tecnologia").count
		@articulosGames = Articulo.where("categoria = ?", "games").count
		@articulosCodegirls = Articulo.where("categoria = ?", "codegirls").count
	end
end
