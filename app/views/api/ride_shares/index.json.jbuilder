json.nodes @nodes.each do |node|
  json.name node.name
  json.id node.alt_id
end

json.links @links.each do |link|
  json.source link.source
  json.target link.target
  json.value link.value
end
