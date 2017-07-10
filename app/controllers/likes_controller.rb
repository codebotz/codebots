class LikesController < ApplicationController

	respond_to :js

	def like
	  puts "LikesController:like"
	  @usuario = current_usuario
	  @articulo = Articulo.find(params[:id])
	  @usuario.like!(@articulo)
	  @artlike = Like.where(articulo_id: @articulo.id).count
	end

	def unlike
	  puts "LikesController:unlike"
	  @usuario = current_usuario
	  @like = @usuario.likes.find_by_articulo_id(params[:id])
	  @articulo = Articulo.find(params[:id])
	  @usuario.unlike!(@articulo, @like)
	  @like.destroy!
	  @artlike = Like.where(articulo_id: @articulo.id).count
	end
end
