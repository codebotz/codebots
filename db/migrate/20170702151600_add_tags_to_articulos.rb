class AddTagsToArticulos < ActiveRecord::Migration[5.0]
  def change
  	add_column :articulos, :tags, :text
  end
end
