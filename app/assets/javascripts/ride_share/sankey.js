angular.module('visOne')

.factory('sankey', [
  '$http',

  function($http){

    var o = {
      rideshares: []
    };

    o.getAll = function() {
      return $http.get('/api/ride_shares').success(function(data){
        angular.copy(data, o.rideshares);
      });
    };

    return o;

  }]);
