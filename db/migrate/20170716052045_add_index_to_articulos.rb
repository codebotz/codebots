class AddIndexToArticulos < ActiveRecord::Migration[5.0]
  def change
  	add_index :articulos, [:url], unique: true
  end
end
