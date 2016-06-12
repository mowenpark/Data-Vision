json.array! @incidents.each do |incident|
  json.id incident.id
  json.category incident.category
  json.description incident.description
  json.day incident.date_time.wday
  json.hour incident.date_time.hour
  json.location incident.location
  json.value rand(0..50)
end
