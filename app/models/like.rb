class Like < ApplicationRecord
	validates :usuario_id, uniqueness: { scope: :articulo_id }

	belongs_to :articulo
	belongs_to :usuario


end
