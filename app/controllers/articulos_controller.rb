class ArticulosController < ApplicationController
  before_action :authenticate_usuario!, except: [:index,:show,:categoria]
  before_action :set_articulo, only: [:show, :edit, :update, :destroy]

  def categoria
    puts "\nArticulos_controller:categoria: [Obteniendo articulos categoria #{params[:categoria]}]"
    @articulos = Articulo.where("categoria = ?", params[:categoria]).order(created_at: :desc).paginate(:page => params[:page], :per_page => 9)
    @articulos.each do |articulo|
      #articulo.like = Like.where(articulo_id: articulo.id).count
      if articulo.like.nil?
        articulo.like = 0
      end
    end
    render "articulos/categoria/#{params[:categoria]}"
  end

  # GET /articulos
  # GET /articulos.json
  def index
    @articulos = Articulo.all.order(created_at: :desc).paginate(:page => params[:page], :per_page => 9)
    @articulos.each do |articulo|
      #articulo.like = Like.where(articulo_id: articulo.id).count
      if articulo.like.nil?
        articulo.like = 0
      end
    end
  end

  
  # GET /articulos/1
  # GET /articulos/1.json
  def show
    #modificando este metodo para traer objetos de la bd cuando ingresen a un articulo
      @articulo = Articulo.find_by_url(params[:id])
      puts "Ingresando a show de articulos"
      @gridarticulos = Articulo.order("RANDOM()").limit(8)
      @artimg = Articulo.order("RANDOM()").limit(1)
      @artrand = Articulo.order("RANDOM()+1").limit(1)      
      @artlike = Like.where(articulo_id: @articulo.id).count
  end


  def url
    puts "\n\n\nmetodo de url::::::::::::"
    @articulo = Articulo.find_by_url(params[:id])
    if @articulo
      render :show
     else
      render file: 'public/404', status: 404, formats: [:html]
     end 
  end


  # GET /articulos/new
  def new
    @articulo = Articulo.new
  end

  # GET /articulos/1/edit
  def edit
    puts "\n\n\nEntro al metodo de edicion de articulo"
    @articulo = Articulo.find(params[:id])
    render :edit
  end

  # POST /articulos
  # POST /articulos.json
  def create
    @articulo = Articulo.new(articulo_params)

    respond_to do |format|
      if @articulo.save
        puts "\n\nGuardado exitoso del artículo"
        format.html { redirect_to '/articulos/#{@articulo.url}', notice: 'Articulo was successfully created.' }
        format.json { render :show, status: :created, location: @articulo }
      else
        format.html { render :new }
        format.json { render json: @articulo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articulos/1
  # PATCH/PUT /articulos/1.json
  def update
    respond_to do |format|
      @articulo = Articulo.find(params[:id])
      if @articulo.update(articulo_params)
        format.html { redirect_to "/articulos/#{@articulo.url}", notice: 'Articulo was successfully updated.' }
        format.json { render :show, status: :ok, location: @articulo }
      else
        format.html { render :edit }
        format.json { render json: @articulo.errors, status: :unprocessable_entity }
      end
    end
  end

  def usuario(id)
    a = Articulo.find_by_url(id)
    #Usuario.find(params[:id])
    Usuario.find(a.id)
  end

  # DELETE /articulos/1
  # DELETE /articulos/1.json
  def destroy
    @articulo.destroy
    respond_to do |format|
      format.html { redirect_to articulos_url, notice: 'Articulo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_articulo
      @articulo = Articulo.find_by_url(params[:url])
      #@articulo = Articulo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def articulo_params
      params.require(:articulo).permit(:usuario_id, :titulo, :intro, :contenido, :categoria, :imagen_previa, :url, :tags)
    end
end
