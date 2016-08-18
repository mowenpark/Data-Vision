json.array! @ipos.each do |ipo|
  json.year ipo.year
  json.biotech_ipos ipo.biotech_ipos
  json.biotech_percent ipo.biotech_percent
  json.other_ipos ipo.other_ipos
  json.other_percent ipo.other_percent
end
