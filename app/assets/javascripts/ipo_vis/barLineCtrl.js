angular.module('visOne')

  .controller('BarLineController', [
    '$scope',
    '$window',
    'ipos',
    function($scope, $window, ipos) {

      $scope.data = ipos.ipos

  }])
