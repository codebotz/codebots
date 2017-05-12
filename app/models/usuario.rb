class Usuario < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

   attr_accessible	:usuario_id, :nombre, :apellido, :nickname, :email, :password, :password_confirmation

   has_many :posts

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
end
