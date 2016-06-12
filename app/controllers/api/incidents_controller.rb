class Api::IncidentsController < ApplicationController

  def index
    @incidents = Incident.where(category: "TRESPASS")
  end

  def show
  end

end
