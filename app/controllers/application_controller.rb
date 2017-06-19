class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permited_parameters, if: :devise_controller?

  protected

	def configure_permited_parameters
		#devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:nombre, :apellido, :nickname, :email, :password, :password_confirmation)}
		devise_parameter_sanitizer.permit(:sign_up, keys: [:nombre, :apellido, :nickname, :email, :password, :password_confirmation])
	end
end
