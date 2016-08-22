json.array! @posts.each do |post|
  json.id post.id
  json.title post.title
  json.link post.link
  json.user post.user
  json.upvotes post.upvotes
  json.comments post.comments
end
