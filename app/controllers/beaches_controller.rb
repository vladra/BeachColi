class BeachesController < ApplicationController

  def index
    @beaches = Beach.all
  end

  def show
    @beach = Beach.find(params[:id])
    @lastweek = @beach.last_7
    @weather = get_weather
  end

  private

  ForecastIO.api_key = 'f3643cbeb1a9eaf8a67e33875b1b8456'

  def get_weather
    forecast = ForecastIO.forecast(@beach.lat, @beach.long)
    weather = { current_temp: forecast.currently.apparentTemperature, chance_precip: forecast.currently.precipProbability, wind_speed: forecast.currently.windSpeed, current_summary: forecast.currently.summary, max: forecast.daily.data[0].apparentTemperatureMax, min: forecast.daily.data[0].apparentTemperatureMin, daily_summary: forecast.daily.data[0].summary, week_summary:forecast.daily.summary }

    return weather
  end
end
