class Api::PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]

  def index
    @posts = Post.all
    render :index
  end

  def create
    @post = Post.create(post_params.merge(user_id: current_user.id))
    render :show
  end

  def show
    @post = Post.includes(:comments => :user).find(params[:id])
    render :show
  end

  def upvote
    @post = Post.find(params[:id])
    @post.increment!(:upvotes)
    render :show
  end

  private

  def post_params
    params.require(:post).permit(:link, :title)
  end

end
