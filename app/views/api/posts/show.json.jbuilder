json.post do
  json.title @post.title
  json.link @post.link
  json.id @post.id
  json.comments @post.comments do |comment|
    json.body comment.body
    json.id comment.id
    json.post_id comment.post_id
    json.user comment.user
  end
  json.user @post.user
end
