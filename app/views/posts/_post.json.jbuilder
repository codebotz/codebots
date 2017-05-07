json.extract! post, :id, :titulo, :contenido, :likes, :etiquetas, :created_at, :updated_at
json.url post_url(post, format: :json)
