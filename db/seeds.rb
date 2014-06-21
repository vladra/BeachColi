require 'nokogiri'
require 'open-uri'

data = Nokogiri::XML(open("http://app.toronto.ca/tpha/ws/beaches.xml?v=1.0"))
data.css('beachMeta').each do |object|
  object.to_h
  if object['id'].to_i != 0
    Beach.create(name: object["name"], lat: object["lat"], long: object["long"])
  end
end

doc = Nokogiri::XML(open('http://app.toronto.ca/tpha/ws/beaches/history.xml?v=1.0&from=2013-06-01&to=2014-06-20'))
data = doc.css('beachData')
last_ecoli = 0
data.each do |object|
  id = object["beachId"]
  date = Date.parse(object.css('sampleDate').text)
  count = object.css('eColiCount').text
  count.nil? ? count = last_ecoli : count
  advisory = object.css('beachAdvisory').text
  status = object.css('beachStatus').text
  last_ecoli = count if !count.nil?
  Beach.find(id).ecolis << Ecoli.create(date: date, count: count, advisory: advisory, status: status)
end




# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
