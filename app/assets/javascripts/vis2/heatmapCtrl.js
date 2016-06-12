angular.module('visOne')

  .controller('HeatMapController', [
    '$scope',
    '$window',
    'incidents',
    function($scope, $window, incidents) {

      $scope.incidents = incidents.incidents

      $scope.filterResults = function (scope) {
        return $http.get('/api/incidents', {
          params: {user_selection: scope.myVar}
        }).success(function(data){
          debugger
          angular.copy(data, o.incidents);
        });

      }

  }])
