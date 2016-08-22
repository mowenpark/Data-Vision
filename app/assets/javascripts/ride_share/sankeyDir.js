angular.module('visOne')
  .directive('sankeyChart', function () {

    function link(scope, el) {

      var data = scope.data;

      var ele = el[0];

      var colors = {
            'united_states':         '#edbd00',
            'india':              '#367d85',
            'asia':             '#97ba4c',
            'uber':              '#f5662b'
          };

      var svg = d3.select(ele).append("svg")
        .attr('height', '500')
        .attr('width', '1000');

      var chart = svg.chart('Sankey.Path');

      chart.name(label)
        .colorNodes(function(name, node) {
          return color(node, 1) || '#4d4d4f';
        })
        .colorLinks(function(link) {
          return color(link.source, 4) || color(link.target, 1) || colors.fallback;
        })
        .nodeWidth(15)
        .nodePadding(10)
        .spread(true)
        .iterations(0)
        .draw(data);

      function label(node) {
        return node.name.replace(/\s*\(.*?\)$/, '');
      }

      function color(node, depth) {
        var id = node.id.replace(/(_score)?(_\d+)?$/, '');
        if (colors[id]) {
          return colors[id];
        } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
          return color(node.targetLinks[0].source, depth-1);
        } else {
          return null;
        }
      }

    };

    return {
      link: link,
      restrict: 'E',
      scope: {data: "="}
    }

  });
