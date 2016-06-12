angular.module('visOne')

  .controller('HeatMapController', [
    '$scope',
    '$window',
    'incidents',
    function($scope, $window, incidents) {

      $scope.data = incidents.incidents
      $scope.incidents = incidents

      $scope.filterResults = function (scope) {
        scope.incidents.filterResults(scope.myVar).success(function(data){
          $scope.data = data;
        });
      }

  }])
