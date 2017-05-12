class Post < ApplicationRecord
	attr_accessible :titulo, :contenido, :likes, :usuario_id
	#Un post pertenece a un usuario
	belongs_to :usuario

	validates :titulo, presence: true
						#,
						#lenght: {minimum: 100}
						#uniqueness: true, length: { maximum: 100 }
	validates :contenido, presence: true
	validates :usuario_id, presence: true
end
