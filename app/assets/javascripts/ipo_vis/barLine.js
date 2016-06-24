angular.module('visOne')

.factory('ipos', [
  '$http',

  function($http){

    var o = {
      ipos: []
    };

    o.getAll = function() {
      return $http.get('/api/ipos').success(function(data){
        angular.copy(data, o.ipos);
      });
    };

    return o;

}]);
