class Api::RideSharesController < ApplicationController

  def index
    @nodes = Node.all
    @links = Link.all
  end

end
