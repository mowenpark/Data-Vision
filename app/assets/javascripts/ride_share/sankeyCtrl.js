angular.module('visOne')

.controller('SankeyController', [
  '$scope',
  '$window',
  'sankey',
  function($scope, $window, sankey) {
    debugger

    $scope.data = sankey.rideshares

  }])
