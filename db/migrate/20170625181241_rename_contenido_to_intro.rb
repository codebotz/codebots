class RenameContenidoToIntro < ActiveRecord::Migration[5.0]
  def change
  	rename_column :articulos, :contenido, :intro
  end
end
