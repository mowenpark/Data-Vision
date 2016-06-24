class Api::IposController < ApplicationController

  def index
    @ipos = Ipo.all
  end

  def show
  end

end
