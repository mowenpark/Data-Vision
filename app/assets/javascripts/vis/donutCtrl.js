angular.module('visOne')

.controller('DonutChartController', function($scope) {
  $scope.charts = d3.range(10).map(function () {
    return d3.range(10).map(Math.random)
  })
})
