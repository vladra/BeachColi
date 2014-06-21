require 'nokogiri'
require 'open-uri'

data = Nokogiri::XML(open("http://app.toronto.ca/tpha/ws/beaches.xml?v=1.0"))
data.css('beachMeta').each do |object|
  object.to_h
  Beach.create(name: object["name"], lat: object["lat"], long: object["long"])
end




# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
