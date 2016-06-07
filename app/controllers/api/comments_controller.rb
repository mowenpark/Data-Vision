class Api::CommentsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create(comment_params.merge(user_id: current_user.id))
    render :show
  end

  def upvote
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.increment!(:upvotes)
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

end
