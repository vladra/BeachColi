class BeachesController < ApplicationController

  def index
    @beaches = Beach.all
  end

  def show
    @beach = Beach.find(params[:id])
    @lastweek = @beach.last_7
  end

  private

end
