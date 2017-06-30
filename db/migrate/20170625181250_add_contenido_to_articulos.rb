class AddContenidoToArticulos < ActiveRecord::Migration[5.0]
  def change
  	add_column :articulos, :contenido, :text
  end
end
