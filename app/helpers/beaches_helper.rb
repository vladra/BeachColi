module BeachesHelper

  # Return an array of hashes with each beach data
  # If beach passed to method, return 1 beach data, otherwise return all beaches data
  # return 1 beach will look like this -> {:name, : lat, :long, : ecoli}
  # if all beaches will look like this -> [{:name, :lat, :long, :ecoli}, {:name, :lat, :long, :ecoli}, ...]
  def avg_3_or(beach=nil)
    return @all_data if @all_data
    if beach == nil # return many beaches
      @beaches = Beach.all
      @all_data = []
      @beaches.all.each do |beach|
        ecolis = beach.ecolis.order('date desc').select(:count).limit(3)
        ecoli_num = ecolis.first.count > 100 ? ecolis.first.count : (ecolis.inject(0) {|t, e| t+=e.count; t})/3
        beach_data = {id: beach.id, name: beach.name, lat: beach.lat, long: beach.long, ecoli: ecoli_num}
        @all_data << beach_data
      end
      @all_data
    else # ??? remove this line if  beach is instance object of Beach model
      ecolis = beach.ecolis.order('date desc').select(:count).limit(3)
      ecoli_num = ecolis.first.count > 100 ? ecolis.first.count : (ecolis.inject(0) {|t, e| t+=e.count; t})/3
      @all_data = [{name: beach.name, lat: beach.lat, long: beach.long, ecoli: ecoli_num}]
    end
  end

  # Return integer of days - x days below 100 ecoli in a row
  def ecoli_streak(beach)
    days = 0
    beach.ecolis.each do |ecoli|
      if ecoli.count < 101
        days += 1
      else
        return days
      end
    end
  end

  # Return data to build table for last 40 days or this summer, whichever has more days
  # -> {:dates = [...], :ecoli = [...]}
  def last_28_or_summer(beach)
    ecolis = beach.ecolis.order('date asc').where('date > ?', Time.now.beginning_of_year)
    if ecolis.count < 29
      ecoli_data = {dates: [], ecoli: []}
      ecolis.each do |ecoli|
        ecoli_data[:dates] << ecoli.date.strftime("%d %b")
        ecoli_data[:ecoli] << ecoli.count
      end
      ecoli_data
    else
      ecoli_data = summer_ecoli(beach, Time.now.year) # ? .year or .beginning_of_year
    end
  end

  # Return data to build table for summer, devided by weeks
  # -> {:dates = [...], :ecoli = [...]}
  def summer_ecoli(beach, year)
    start_period  = Time.new(year)
    end_period    = Time.new(year+1)
    ecolis = beach.ecolis.order('date asc').where('date > ? and date < ?', start_period, end_period)
    ecoli_data = {dates: [], ecoli: []}

    ecolis.each_slice(7) do |week_ecoli|
      ecoli_data[:dates] << week_ecoli.first.date.strftime("%d %b")
      ecoli_data[:ecoli] << (week_ecoli.inject(0) {|avg, e| avg += e.count; avg} / week_ecoli.length)
    end

    ecoli_data
  end

end





