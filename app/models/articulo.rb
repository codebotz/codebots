class Articulo < ApplicationRecord
	attr_accessible :titulo, :contenido, :intro, :usuario_id, :imagen_previa, :url, :categoria, :tags, :like
	#Un articulo pertenece a un usuario
	belongs_to :usuario

	has_many :likes, dependent: :destroy
  	has_many :usuarios, through: :likes

	validates :titulo, presence: true
						#,
						#lenght: {minimum: 100}
						#uniqueness: true, length: { maximum: 100 }
	validates :intro, presence: true
	validates :contenido, presence: true
	validates :usuario_id, presence: true
	validates :imagen_previa, presence: true
	validates :url, presence: true
	validates :categoria, presence: true
	validates :tags, presence: true

end
