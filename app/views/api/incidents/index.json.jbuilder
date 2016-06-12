hsh = Hash.new { |hash, key| hash[key] = {} }
7.times do |i|
  hsh[i] = Hash.new { |hash, key| hash[key] = 0 }
  24.times do |j|
    hsh[i][j] = 0
  end
end


json.array! @incidents.each do |incident|
  json.id incident.id
  json.category incident.category
  json.description incident.description
  json.day incident.date_time.wday
  json.hour incident.date_time.hour
  json.location incident.location
  json.value rand(0..50)
end
