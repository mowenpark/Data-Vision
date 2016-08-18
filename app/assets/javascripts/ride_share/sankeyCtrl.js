angular.module('visOne')

.controller('SankeyController', [
  '$scope',
  '$window',
  'sankey',
  function($scope, $window, sankey) {

    $scope.data = sankey.rideshares;

  }])
