class CreateArticulos < ActiveRecord::Migration[5.0]
  def change
    create_table :articulos do |t|
      t.string :titulo
      t.text :contenido
      t.string :imagen_previa
      t.string :url

      t.timestamps
    end
  end
end
