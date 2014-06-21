class Ecoli < ActiveRecord::Base
  belongs_to :beach

  def self.daily_scrape
    doc = Nokogiri::XML(open('http://app.toronto.ca/tpha/ws/beaches.xml?v=1.0'))
    data = doc.css('beachData')
    data.each do |object|
      if object["beachId"].to_i != 0
        id = object["beachId"]
        date = Date.parse(object.css('sampleDate').text)
        count = object.css('eColiCount').text
        count = Beach.find(id).ecolis.order('date desc').first.count if count.empty?
        advisory = object.css('beachAdvisory').text
        status = object.css('beachStatus').text
        Beach.find(id).ecolis << Ecoli.create(date: date, count: count, advisory: advisory, status: status)
      end
    end
  end
end
