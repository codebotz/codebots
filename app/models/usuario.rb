class Usuario < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

   attr_accessible	:usuario_id, :nombre, :apellido, :nickname, :email, :password, :password_confirmation

   has_many :posts
   has_many :likes, dependent: :destroy
   has_many :articulos, through: :likes


   #Validaciones para un usuario nuevo
   validates :nombre, presence: true
   validates :apellido, presence: true
   validates :nickname, presence: true,
   					    uniqueness: true,
   					 format: {
   					 	#validar el with
   					 	#with: /\A[a-zA-Z]+\z/ para solo letras
   					 	#with: /a-zA-Z0-9_-/,
   					 	with: /[a-zA-Z0-9_-]/,
   					 	message: 'Formato incorrecto (sólo a-z, A-Z, 0-9, -)'
   					 }
   validates :email, presence: true,
   					 uniqueness: true


   def nombre_completo
   	nombre + " " + apellido   	
   end

   # creates a new like row with articulo_id and usuario_id
  def like!(articulo)
    self.likes.create!(articulo_id: articulo.id)
  end

  # destroys a likes with matching articulo_id and usuario_id
  def unlike!(articulo)
    like = self.likes.find_by_id(articulo.id)
    like.destroy!
  end

  # returns true of false if a articulo is liked by usuario
  def like?(articulo)
    self.likes.find_by_articulo_id(articulo.id)
  end


end
