angular.module('visOne')

  .controller('HeatMapController', [
    '$scope',
    '$window',
    'incidents',
    function($scope, $window, incidents) {

      $scope.incidents = incidents.incidents

  }])
