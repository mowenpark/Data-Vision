angular.module('visOne', ['ui.router', 'templates', 'Devise'])

  .config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })

    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'posts/_posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    })

    .state('donut', {
      url: '/donut',
      templateUrl: 'vis/_donut.html',
      controller: 'DonutChartController'
    })

    .state('heatmap', {
      url: '/heatmap',
      templateUrl: 'vis2/_heatmap.html',
      controller: 'HeatMapController',
      resolve: {
        incident: ['$stateParams', 'incidents', function($stateParams, incidents) {
          return incidents.getAll();
        }]
      }
    })

<<<<<<< HEAD
    .state('ipo_vis', {
      url: '/ipo_vis',
      templateUrl: 'ipo_vis/_barLine.html',
      controller: 'BarLineController',
      resolve: {
        ipo: ['$stateParams', 'ipos', function($stateParams, ipos) {
          return ipos.getAll();
        }]
      }
    })

=======
>>>>>>> 5b6095906fdb82be06ad9df93bd034dc978f4eb1
  $urlRouterProvider.otherwise('home');
}]);
