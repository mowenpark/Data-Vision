# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

guest = User.create({email: "michael@email.com", username: "Michael", password: "password"})

donuts = Post.create({title: "donuts!", link: "#/donut", user_id: guest.id, upvotes: 5})
heat = Post.create({title: "SFPD heatmap", link: "#/heatmap", user_id: guest.id, upvotes: 7})

comments = donuts.comments.create([{user_id: guest.id, body: 'Cool post!', upvotes: 3},
    {user_id: guest.id, body: 'Great idea but everything is wrong!', upvotes: 1}])

police_csv = 'app/assets/SFPD_Incidents.csv'

ipo_csv = 'app/assets/ipos_data.csv'

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
