class ChangeUpvoteDefaults < ActiveRecord::Migration
  def change
    change_column_default(:posts, :upvotes, 0)
    change_column_default(:comments, :upvotes, 0)
  end
end
