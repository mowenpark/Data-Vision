angular.module('visOne')

.factory('ipos', [
  '$http',

  function($http){

    var o = {
      ipos: []
    };

    o.getAll = function() {
      debugger
      return $http.get('/api/ipos').success(function(data){
        debugger
        angular.copy(data, o.ipos);
      });
    };

    return o;

}]);
