class Api::IncidentsController < ApplicationController

  def index
    category = params["user_selection"] || "TRESPASS"
    @incidents = Incident.where(category: category)
  end

  def show
  end

end
