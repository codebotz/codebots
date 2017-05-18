class PagesController < ApplicationController

  before_action :authenticate_usuario!, except: [:index,:show,:miperfil,:inicio]
	#Metodo para cuando se da cilck en ir a perfil(propio)
  def home
  	nickname = current_usuario.nickname
  	@usuario = Usuario.find_by_nickname(nickname)
  		if @usuario
		  	puts @usuario.class
		  	@posts = @usuario.posts.all.order(created_at: :desc).paginate(page: params[:page], per_page: 5)
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
  		@posts = @usuario.posts.all.order(created_at: :desc).paginate(page: params[:page], per_page: 5)
  	 	render :show
  	 else
  	 	render file: 'public/404', status: 404, formats: [:html]
  	 end 
  end
end
