arr = []
7.times do |i|
  24.times do |j|
    h = Hash.new { |hash, key| hash[key] }
    h[:day] = i
    h[:hour] = j
    h[:value] = 0
    arr << h
  end
end

@incidents.each do |incident|
  date_time = arr.select{|ele| ele[:day] == incident.date_time.wday && ele[:hour] == incident.date_time.hour}
  date_time[0][:value] += 1
end

json.array! arr.each do |incident_count|
  json.day incident_count[:day]
  json.hour incident_count[:hour]
  json.value incident_count[:value]
end
