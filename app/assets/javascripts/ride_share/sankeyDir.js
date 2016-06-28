angular.module('visOne')
  .directive('sankeyChart', function () {

    function link(scope, el) {

      var ele = el[0];

      var colors = {
            'environment':         '#edbd00',
            'social':              '#367d85',
            'animals':             '#97ba4c',
            'health':              '#f5662b',
            'research_ingredient': '#3f3e47',
            'fallback':            '#9f9fa3'
          };

      var svg = d3.select(ele).append("svg")
        .attr('height', '500')
        .attr('width', '1000');

      var chart = svg.chart('Sankey.Path');

      d3.json("https://rawgit.com/q-m/d3.chart.sankey/master/example/data/product.json", function(error, json) {

        chart.name(label)
          .colorNodes(function(name, node) {
            return color(node, 1) || colors.fallback;
          })
          .colorLinks(function(link) {
            return color(link.source, 4) || color(link.target, 1) || colors.fallback;
          })
          .nodeWidth(15)
          .nodePadding(10)
          .spread(true)
          .iterations(0)
          .draw(json);

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

      });

    };

    return {
      link: link,
      restrict: 'E',
      scope: {data: "="}
    }

  });
