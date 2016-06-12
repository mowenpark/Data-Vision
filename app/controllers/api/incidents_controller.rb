class Api::IncidentsController < ApplicationController

  def index
    category = params["user_selection"] || "TRESPASS"
    @incidents = Incident.where(category: category).limit(2000)
  end

  def show
  end

end
