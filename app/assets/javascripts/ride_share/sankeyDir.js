angular.module('visOne')
  .directive('sankeyChart', function () {

    function link(scope, el) {

      var data = scope.data;

      var el = el[0];

    };

    return {
      link: link,
      restrict: 'E',
      scope: {data: "="}
    }

  });
