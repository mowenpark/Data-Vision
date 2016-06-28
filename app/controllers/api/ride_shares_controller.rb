class Api::RideSharesController < ApplicationController

  def index
    @nodes = Node.all
    @links = Links.all
  end

end
