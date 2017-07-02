class AddUsuarioIdToArticulos < ActiveRecord::Migration[5.0]
  #Agregando cambios para relacionar post con usuario
  def change
  	add_column :articulos, :usuario_id, :integer
  	add_index :articulos,  :usuario_id
  end
end
