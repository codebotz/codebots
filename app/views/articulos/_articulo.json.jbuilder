json.extract! articulo, :id, :titulo, :contenido, :imagen_previa, :url, :created_at, :updated_at
json.url articulo_url(articulo, format: :json)
