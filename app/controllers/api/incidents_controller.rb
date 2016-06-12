class Api::IncidentsController < ApplicationController

  def index
    @incidents = Incident.where('extract(year  from date_time) = ?', 2015).limit(100)
  end

  def show
  end
end
