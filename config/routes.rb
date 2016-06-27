Rails.application.routes.draw do

  devise_for :users
  root to: 'application#angular'

  namespace :api, defaults: {format: :json} do

    resources :rideshares, only: [:index, :show]

    resources :ipos, only: [:index, :show]

    resources :incidents, only: [:index, :show]

    resources :posts, only: [:create, :index, :show] do
      resources :comments, only: [:show, :create] do
        member do
          put '/upvote' => 'comments#upvote'
        end
      end

      member do
        put '/upvote' => 'posts#upvote'
      end
    end
  end

end
