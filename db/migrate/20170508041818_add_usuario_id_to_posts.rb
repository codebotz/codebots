class AddUsuarioIdToPosts < ActiveRecord::Migration[5.0]
  #Agregando cambios para relacionar post con usuario
  def change
  	add_column :posts, :usuario_id, :integer
  	add_index :posts,  :usuario_id
  end
end
