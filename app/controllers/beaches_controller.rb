class BeachesController < ApplicationController

  def index
    @beaches = Beach.all
  end

  def show
    @beach = Beach.find(params[:id])
    @lastweek = @beach.last_7
    @weather = get_weather
  end

  def about
  end

  private

  ForecastIO.api_key = 'f3643cbeb1a9eaf8a67e33875b1b8456'

  def get_weather
    forecast = ForecastIO.forecast(@beach.lat, @beach.long)
    weather = { current_temp: ftc(forecast.currently.apparentTemperature.to_i), chance_precip: forecast.currently.precipProbability.to_i, wind_speed: (forecast.currently.windSpeed.to_i * 1.62).to_i, current_summary: forecast.currently.summary, max: ftc(forecast.daily.data[0].apparentTemperatureMax.to_i), min: ftc(forecast.daily.data[0].apparentTemperatureMin.to_i), daily_summary: forecast.daily.data[0].summary, week_summary:forecast.daily.summary }

    return weather
  end

  def ftc(temp)
    (temp - 32) * 5/9
  end
end
