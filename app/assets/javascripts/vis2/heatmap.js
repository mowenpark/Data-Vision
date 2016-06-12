angular.module('visOne')

.factory('incidents', [
  '$http',

  function($http){

    var o = {
      incidents: []
    };

    o.getAll = function() {
      return $http.get('/api/incidents').success(function(data){
        angular.copy(data, o.incidents);
      });
    };

    // o.get = function(id) {
    //   return $http.get('/api/posts/' + id).then(function(res){
    //     return res.data.post;
    //   });
    // };

    return o;

}]);
