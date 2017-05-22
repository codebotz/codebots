class PostsController < ApplicationController
  #agregar before_filters
  before_action :authenticate_usuario!, except: [:index,:show]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all.order(created_at: :desc).paginate(:page => params[:page], :per_page => 15)
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    #@post.usuario_id = current_usuario.id
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, success: 'Post creado correctamente.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, success: 'Post editado exitosamente.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def usuario(id)
    Usuario.find(params[:id])
  end

  #agregando funcion para dar like
=begin
  def like
    if params[:post_id]
      puts "aqui voy bien \n\n"
    end
    puts "#{params[:post_id]}"
    respond_to do |format|
      puts "Dando like\n\n"
      post = Post.find(params[:post_id])
      puts post.to_s
      if addLike(post)
        puts "agregue like"
        format.html { redirect_to posts_path, notice: 'Has dado Like!.' }
        format.json { render :show, status: :ok, location: post }
      else
        puts "error al agregar like"
        format.html { render :show }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def addLike(post)
    puts "metodo addLike:#{post.class}"
=begin
    puts "agregando like..id del post: #{post.id}\n\n\n\n\n\n"
    puts "likes anterior: #{post.likes}"
    post+= post
    puts "likes actual: #{post}"
    #post.update(post_params)

true
  end
=end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, success: 'Post eliminado correctamente.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:usuario_id, :titulo, :contenido, :likes, :id)
    end
end
