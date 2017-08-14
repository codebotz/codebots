class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  RUTA = 'codebots.herokuapp.com'
  #RUTA = 'localhost:3000'
end