class Post < ApplicationRecord
	attr_accessible :titulo, :contenido, :likes, :usuario_id
	#Un post pertenece a un usuario
	belongs_to :usuario
end
