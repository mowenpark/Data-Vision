class Api::IncidentsController < ApplicationController

  def index
    @incidents = Incident.where(category: "WARRANTS").where('extract(year  from date_time) = ?', 2015)
  end

  def show
  end

end
