require 'nokogiri'
require 'open-uri'
require 'date'

doc = Nokogiri::XML(open('http://app.toronto.ca/tpha/ws/beaches/history.xml?v=1.0&from=2014-06-01&to=2014-06-20'))
data = doc.css('beachData')

data.each do |object|
  id = object["beachId"].to_i + 1
  date = Date.parse(object.css('sampleDate').text)
  count =object.css('eColiCount').text
  advisory = object.css('beachAdvisory').text
  status = object.css('beachStatus').text
  puts date
  puts date.class
end

