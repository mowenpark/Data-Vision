# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

guest = User.create({email: "michael@email.com", username: "Michael", password: "password"})

donuts = Post.create({title: "donuts!", link: "#/donut", user_id: guest.id, upvotes: 3})
heat = Post.create({title: "SFPD heatmap", link: "#/heatmap", user_id: guest.id, upvotes: 7})
ipos = Post.create({title: "Tech IPOs", link: "#/ipo_vis", user_id: guest.id, upvotes: 13})
ipos = Post.create({title: "Rideshares", link: "#/ride_share", user_id: guest.id, upvotes: 11})

comments = donuts.comments.create([{user_id: guest.id, body: 'Cool post!', upvotes: 3},
    {user_id: guest.id, body: 'Great idea but everything is wrong!', upvotes: 1}])

police_csv = 'app/assets/SFPD_Incidents.csv'
ipo_csv = 'app/assets/ipos_data.csv'
nodes_csv = 'app/assets/nodes.csv'
links_csv = 'app/assets/links.csv'

CSV.foreach(police_csv, headers: true) do |row|
  category = row["Category"]
  description = row["Descript"]
  day_val = row["DayOfWeek"]
  date_val = row["Date"]
  time_val = row["Time"]
  date_time = Time.strptime("#{date_val} #{time_val}", '%m/%d/%Y %H:%M')
  location = row["Location"]
  new_incident = Incident.create({
    category: category,
    description: description,
    day_val: day_val,
    date_time: date_time,
    location: location
  })
end

CSV.foreach(ipo_csv, headers: true) do |row|
  year = row["year"]
  biotech_ipos = row["biotech_ipos"]
  biotech_percent = row["biotech_percent"]
  other_ipos = row["other_ipos"]
  other_percent = row["other_percent"]
  new_ipo = Ipo.create({
    year: year,
    biotech_ipos: biotech_ipos,
    biotech_percent: biotech_percent,
    other_ipos: other_ipos,
    other_percent: other_percent
  })
end

CSV.foreach(nodes_csv, headers: true) do |row|
  name = row["name"]
  alt_id = row["id"]
  new_node = Node.create({
    name: name,
    alt_id: alt_id
    })
end

CSV.foreach(links_csv, headers: true) do |row|
  source = row["source"]
  target = row["target"]
  value = row['value']
  new_link = Link.create({
    source: source,
    target: target,
    value: value
    })
end
