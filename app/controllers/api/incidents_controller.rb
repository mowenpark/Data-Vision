class Api::IncidentsController < ApplicationController

  def index
    category = params["user_selection"] || "VANDALISM"
    @incidents = Incident.where(category: category)
  end

  def show
  end

end
