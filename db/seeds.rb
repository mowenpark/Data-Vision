# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

guest = User.create({email: "michael@email.com", username: "Michael", password: "password"})

donuts = Post.create({title: "donuts!", link: "#/donut", user_id: guest.id, upvotes: 5})

comments = donuts.comments.create([{user_id: guest.id, body: 'Cool post!', upvotes: 3},
    {user_id: guest.id, body: 'Great idea but everything is wrong!', upvotes: 1}])
