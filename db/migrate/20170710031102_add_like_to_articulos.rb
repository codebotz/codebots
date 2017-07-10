class AddLikeToArticulos < ActiveRecord::Migration[5.0]
  def change
  	add_column :articulos, :like, :integer
  end
end
