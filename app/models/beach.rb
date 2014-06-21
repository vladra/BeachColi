class Beach < ActiveRecord::Base
  has_many :ecolis

  # ecoli data for last 7 days for certain beach
  def last_7
    ecolis.order('date desc').select(:count).limit(7)
  end

  # todays ecoli for certain beach
  def today_ecoli
    ecolis.order('date desc').select(:count).first.count
  end
end
