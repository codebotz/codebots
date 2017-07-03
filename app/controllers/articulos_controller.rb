class ArticulosController < ApplicationController
  before_action :authenticate_usuario!, except: [:index,:show]
  before_action :set_articulo, only: [:show, :edit, :update, :destroy]

  def categoria
    puts "\nArticulos_controller:categoria: [Obteniendo articulos categoria #{params[:categoria]}]"
    @articulos = Articulo.where("categoria = ?", params[:categoria]).order(created_at: :desc).paginate(:page => params[:page], :per_page => 9)
    render "articulos/categoria/#{params[:categoria]}"
  end

  # GET /articulos
  # GET /articulos.json
  def index
    @articulos = Articulo.all.order(created_at: :desc).paginate(:page => params[:page], :per_page => 9)
  end

  # GET /articulos/1
  # GET /articulos/1.json
  def show

    #modificando este metodo para traer objetos de la bd cuando ingresen a un articulo
    #@articulos = Articulo.find_by_url(params[:url])
    #if @articulo
      puts "Ingresando a show de articulos"
      #@articulosSmall = Articulos.order("RAND()").limit(2)
      @gridarticulos = Articulo.order("RANDOM()").limit(8)
      @artimg = Articulo.order("RANDOM()").limit(1)
      @artrand = Articulo.order("RANDOM()+1").limit(1)      
      @likes = Like.where(articulo_id: @articulo.id).count


      #@articulo = Articulo.find_by_url(params[:url])
      
      #render :show
    #else
     #render file: 'public/404', status: 404, formats: [:html]
    #end 

    #HAcer que no se repitan los articulos artrand y artimg


    #a = Articulo.order("RANDOM()").limit(1)
    #until a.titulo!=@gridarticulos.titulo do
      #@artrand = Articulo.order("RANDOM()").limit(1)      
    #end
  end

  # GET /articulos/new
  def new
    @articulo = Articulo.new
  end

  # GET /articulos/1/edit
  def edit
  end

  # POST /articulos
  # POST /articulos.json
  def create
    @articulo = Articulo.new(articulo_params)

    respond_to do |format|
      if @articulo.save
        format.html { redirect_to @articulo, notice: 'Articulo was successfully created.' }
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
      if @articulo.update(articulo_params)
        format.html { redirect_to @articulo, notice: 'Articulo was successfully updated.' }
        format.json { render :show, status: :ok, location: @articulo }
      else
        format.html { render :edit }
        format.json { render json: @articulo.errors, status: :unprocessable_entity }
      end
    end
  end

  def usuario(id)
    Usuario.find(params[:id])
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
      #@articulo = Articulo.find_by_url(params[:url])
      @articulo = Articulo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def articulo_params
      params.require(:articulo).permit(:usuario_id, :titulo, :intro, :contenido, :categoria, :imagen_previa, :url, :tags)
    end
end
