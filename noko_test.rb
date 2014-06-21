require 'nokogiri'
require 'open-uri'
require 'date'

doc = Nokogiri::XML(open('http://app.toronto.ca/tpha/ws/beaches/history.xml?v=1.0&from=2013-07-02&to=2013-07-02'))
data = doc.css('beachData')

last_ecoli = 0
data.each do |object|
  id = object["beachId"].to_i + 1
  date = Date.parse(object.css('sampleDate').text)
  count = object.css('eColiCount')
  count.empty? ? count = last_ecoli : count = count.text
  # count.empty? ? count = last_ecoli : count

  advisory = object.css('beachAdvisory').text
  status = object.css('beachStatus').text

  last_ecoli = count if !count.empty?

  puts count
end

