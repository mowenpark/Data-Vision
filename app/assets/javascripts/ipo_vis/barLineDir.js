angular.module('visOne')
  .directive('barlineChart', function () {

    function link(scope, el) {

      var data = scope.data;

      var el = el[0];

      var dispatch = d3.dispatch('hideTooltip', 'iTooltip');

      var container;
      var axes;

      var lineHeight = 100,
          lineWidth = 600;

      var chartPadding = 30,
          chartHeight = 490,
          chartWidth = 907;

      var visPadding = {
          top: 10,
          right: 20,
          bottom: 10,
          left: 70,
          middle: 50
      }

      var timeX = d3.scale.linear();

      var dateStart = data[0].year;
      var dateEnd = data[data.length - 1].year;

      timeX.domain([dateStart,dateEnd]);
      timeX.range([0,lineWidth-visPadding.middle]);

      var chartColors = d3.scale.ordinal();
      chartColors
          .domain(['corr', 'disp', 'hfu', 'hfri', 'fof', 'date'])
          .range(['#FC9E27', '#3A7FA3', '#B5CF6B', '#D6616B', '#E7BA52', '#888']);

      var interactiveX = d3.scale.ordinal();
      interactiveX.domain(d3.range(0,data.length,1));
      interactiveX.rangeBands([0,lineWidth - visPadding.middle])

      var maxD = d3.max(data, function(d) { return d.biotech_ipos; });
      var maxC = d3.max(data, function(d) { return d.other_ipos; });
      var maxDC = d3.max([maxD, maxC]);

      var minD = d3.min(data, function(d) { return d.biotech_ipos; });
      var minC = d3.min(data, function(d) { return d.other_ipos; });
      var minDC = d3.min([minD, minC]);

      var lineY = d3.scale.linear();
      lineY.domain([minDC < 0 ? minDC : 0, maxDC]);
      lineY.range([lineHeight,0]);

      var maxFOF = d3.max(data, function(d) { return d.fof; });
      var maxHFRI = d3.max(data, function(d) { return d.hfri; });
      var maxHFU = d3.max(data, function(d) { return d.hfu; });


      var minFOF = d3.min(data, function(d) { return d.fof; });
      var minHFRI = d3.min(data, function(d) { return d.hfri; });
      var minHFU = d3.min(data, function(d) { return d.hfu; });


      var fofBound = Math.max(Math.abs(minFOF), Math.abs(maxFOF));
      var hfriBound = Math.max(Math.abs(minHFRI), Math.abs(maxHFRI));
      var hfuBound = Math.max(Math.abs(minHFU), Math.abs(maxHFU));

      var fofY = d3.scale.linear();
      fofY.domain([-fofBound, 0, fofBound])
      fofY.range([lineHeight/2, lineHeight/2, 0]);

      var hfriY = d3.scale.linear();
      hfriY.domain([-hfriBound, 0, hfriBound])
      hfriY.range([lineHeight/2, lineHeight/2, 0]);

      var hfuY = d3.scale.linear();
      hfuY.domain([-hfuBound, 0, hfuBound])
      hfuY.range([lineHeight/2, lineHeight/2, 0]);

      function getColor(d) {
           if(d.key) return axes.chartColors(d.key);
           else return axes.chartColors(d);
       }

      function buildSkeleton(data) {

          var xAxis = d3.svg.axis()
              .scale(timeX)
              .orient('bottom');

          d3.select('g.container').append('g')
            .attr('class', 'x-axis')
            .call(xAxis);
      }

      function buildDisCorr(data) {

        var dcWrap = d3.select('g.container').selectAll('g.d-c-wrap')
            .append('g')
            .attr('class', 'd-c-wrap');

        var dcText = dcWrap.append('text')
            .attr('transform', 'translate(-11,' + lineHeight/2 + ')')
            .attr('dy', '.3em')
            .attr('text-anchor', 'end');

        dcText.append('tspan')
            .text('Biotech vs.');
        dcText.append('tspan')
            .text('Other Ipos')
            .attr('x', '0')
            .attr('y', '1.4em');

        var keys = ['corr','disp'];
        var linesWrap = dcWrap.selectAll('g').data(function(d) {
            var a = keys.map(function(k) {
                return {
                    data: d,
                    key: k
                };
            })
            return a;
        });
        linesWrap.enter().append('g').attr('class', 'lines-wrap');

        var line = d3.svg.line()
            .x(function(d) { return timeX(d.year); });

        var linesPath = linesWrap.selectAll('path').data(function(d,i) {
            keys[i] = d.key
            return [d.data];
        });

        linesPath.enter().append('path')
              .attr('d', function(d,i,j) {
                  var k = keys[j];
                  line.y(function(d) { return lineY(d[k]); })
                  return line(d,i);
              })
              .attr('stroke', function(d,i,j) { return getColor(keys[j]) })
              .attr('stroke-width', 2)
              .attr('fill', 'none');

          dcWrap.append('g')
              .attr('class', 'z-line');

          var zLine = dcWrap.select('.z-line');

          zLine.append('text')
              .text(0)
              .attr('x', lineWidth - visPadding.middle)
              .attr('y', lineY(0))
              .attr('dy', '0.33em')
              .attr('dx', '1em')
              .attr('text-anchor', 'end');

          return dcWrap;
      }

      scope.$watch('data', function(data) {

        var svg = d3.select(el).append('svg')
          .attr("width", chartWidth)
          .attr("height", chartHeight)

        var container = d3.select('svg').append('g')
            .attr('class', 'container')
            .attr('transform', 'translate(' + visPadding.left + ',' + visPadding.top + ')');

        var skeleton = buildSkeleton(data);
        var disCorrLines = buildDisCorr(data);
        // var alphaBars = buildAlpha(data);
        // var scatter = buildScatter(data);
        // var text = buildTextBox(data);
        // var interactiveLayer = buildInteractiveLayer(data);
        // var tooltips = setupTooltips(scatter, interactiveLayer, text, data);

    });

  }

    return {
      link: link,
      restrict: 'E',
      scope: {data: "="}
    }

  });
