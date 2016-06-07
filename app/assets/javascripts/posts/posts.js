angular.module('visOne')

.factory('posts', [
  '$http',

  function($http){

    var o = {
      posts: []
    };

    o.getAll = function() {
      return $http.get('/api/posts').success(function(data){
        angular.copy(data, o.posts);
      });
    };

    o.get = function(id) {
      return $http.get('/api/posts/' + id).then(function(res){
        return res.data.post;
      });
    };

    o.create = function(post) {
      return $http.post('/api/posts', post).success(function(data){
        o.posts.push(data.post);
      });
    };

    o.upvote = function(post) {
      return $http.put('api/posts/' + post.id + '/upvote')
        .success(function(data){
          post.upvotes += 1;
        });
    };

    o.addComment = function(id, comment) {
      return $http.post('/api/posts/' + id + '/comments', comment);
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/api/posts/' + post.id + '/comments/'+ comment.id + '/upvote')
        .success(function(data){
          comment.upvotes += 1;
        });
    };

    return o;
}]);
