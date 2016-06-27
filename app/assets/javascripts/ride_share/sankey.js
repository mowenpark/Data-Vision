angular.module('visOne')

.factory('sankey', [
  '$http',

  function($http){

    var o = {
      rideshares: []
    };

    o.getAll = function() {
      return $http.get('/api/rideshares').success(function(data){
        angular.copy(data, o.rideshares);
      });
    };

    return o;

  }]);
