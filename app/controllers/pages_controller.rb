class PagesController < ApplicationController
  skip_before_filter :verify_authenticity_token #Para usar metodo post
  before_action :authenticate_usuario!, except: [:index,:show,:miperfil,:inicio,:search]
	#Metodo para cuando se da cilck en ir a perfil(propio)
  def home
  	nickname = current_usuario.nickname
  	@usuario = Usuario.find_by_nickname(nickname)
  		if @usuario
		  	puts @usuario.class
		  	@posts = @usuario.posts.all.order(created_at: :desc).paginate(page: params[:page], per_page: 6)
		  	render :home
		else
			render file: 'public/404', status: 404, formats: [:html]
		end
  end

  #Si el usuario existe se muestra el perfil, si no, se manda a la 404
  def show
  	@usuario = Usuario.find_by_nickname(params[:id])
  	if @usuario
  		#Traer post solo de este usuario
  		@posts = @usuario.posts.all.order(created_at: :desc).paginate(page: params[:page], per_page: 6)
  	 	render :show
  	 else
  	 	render file: 'public/404', status: 404, formats: [:html]
  	 end 
  end

  #Se mostrarán los usuarios, artículos y posts que contengan la palabra de búsqueda
  #https://rubyplus.com/articles/3381-Simple-Search-Form-in-Rails-5
  def search
    respond_to do |format| 
      if params[:busqueda].strip != "" #si hay solo espacios no busca nada
        @busqueda = params[:busqueda]
        puts "\nIngreso al metodo de búsqueda..."
        #Comento la búsqueda de usuarios, aún no dejaté visible esta funcionalidad 
        #@rusuarios = Usuario.where("nickname like ?", "%#{@busqueda.downcase}%")
        @rarticulos = Articulo.where("tags like ?", "%#{@busqueda.downcase}%").order(created_at: :desc)
        #.paginate(:page => params[:page], :per_page => 10)
        format.html { render :busqueda }
      else
        format.html { render :inicio, success: 'Por favor ingresa una palabara para la búsqueda.' }
      end
    end
  end

  #Metodo cuando ponen una url que no esta en un path creado por el admin
  def not_found
    render file: 'public/404', status: 404, formats: [:html]
  end

  #Ultimos articulos mostrados en el aside
  def ultimos_articulos
    puts "\nObteniendo ultimos articulos de la base..."
        @uarticulos = Articulo.limit(3).order(created_at: :desc)
  end

end
