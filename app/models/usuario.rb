class Usuario < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

   attr_accessible	:usuario_id, :nombre, :apellido, :nickname, :email, :password, :password_confirmation

   has_many :posts

   def nombre_completo
   	nombre + " " + apellido   	
   end
end
