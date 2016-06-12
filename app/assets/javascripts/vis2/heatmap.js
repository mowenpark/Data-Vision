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

    o.filterResults = function (user_selection) {
      return $http.get('/api/incidents', {
        params: {user_selection: user_selection}
      }).success(function(data){
        debugger
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
