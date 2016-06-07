angular.module('visOne')

.controller('DonutChartController', function($scope, $window) {
  $scope.charts = d3.range(10).map(function () {
    return d3.range(10).map(Math.random)
  })
  angular.element($window).on('resize', function(){ $scope.$digest() })
})
