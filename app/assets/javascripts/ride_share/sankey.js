angular.module('visOne')

.factory('rideshare', [
  '$http',

  function($http){

    var o = {
      rideshare: []
    };

    o.getAll = function() {
      return $http.get('/api/rideshare').success(function(data){
        angular.copy(data, o.rideshare);
      });
    };

    return o;

  }]);
