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
          chartHeight = 390,
          chartWidth = 907;

      var visPadding = {
          top: 10,
          right: 20,
          bottom: 10,
          left: 70,
          middle: 50
      }

      var scatterWidth = scatterHeight = chartWidth - lineWidth - visPadding.left - visPadding.right;

      var keyReplace = {
        biotech_percent: 'Tech & Biotech',
        other_percent: 'Other IPOs'
      };

      var timeX = d3.scale.linear();

      var dateStart = data[0].year;
      var dateEnd = data[data.length - 1].year;

      timeX.domain([dateStart,dateEnd]);
      timeX.range([0,lineWidth-visPadding.middle]);
      timeX.nice();

      var chartColors = d3.scale.ordinal();
      chartColors
          .domain(['biotech_ipos', 'other_ipos', 'biotech_percent', 'other_percent', 'fof', 'date'])
          .range(['#FC9E27', '#3A7FA3', '#FC9E27', '#3A7FA3', '#E7BA52', '#888']);

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

      var maxHFRI = d3.max(data, function(d) { return d.biotech_percent; });
      var maxHFU = d3.max(data, function(d) { return d.other_percent; });

      var minHFRI = d3.min(data, function(d) { return d.biotech_percent; });
      var minHFU = d3.min(data, function(d) { return d.other_percent; });

      var hfriBound = Math.max(Math.abs(minHFRI), Math.abs(maxHFRI));
      var hfuBound = Math.max(Math.abs(minHFU), Math.abs(maxHFU));

      var biotech_percentY = d3.scale.linear();
      biotech_percentY.domain([-hfriBound, 0, hfriBound])
      biotech_percentY.range([lineHeight/2, lineHeight/2, 0]);

      var other_percentY = d3.scale.linear();
      other_percentY.domain([-hfuBound, 0, hfuBound])
      other_percentY.range([lineHeight/2, lineHeight/2, 0]);

      var charts = d3.scale.ordinal();
      charts.domain(['biotech_ipos','other_ipos', 'biotech_percent', 'other_percent'])
        .range([2*(lineHeight + chartPadding), 2*(lineHeight + chartPadding) + 13, (lineHeight + chartPadding), 0]);

      function getColor(d) {
           if(d.key) return chartColors(d.key);
           else return chartColors(d);
       }

      function buildSkeleton(data) {

          var xAxis = d3.svg.axis()
              .scale(timeX)
              .outerTickSize([2])
              .orient('bottom');

          d3.select('g.container').append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + (charts('corrDisp') + lineY(0)) + ')')
            .call(xAxis
              .tickFormat(d3.format("04d")));
      }

      function buildAlpha(data) {
        var alphaWrap = d3.select('g.container').selectAll('g.alpha-warp').data([data]);
        alphaWrap.enter().append('g')
            .attr('class', 'alpha-wrap');

        var keys = ['biotech_percent','other_percent'];
        var barsWrap = alphaWrap.selectAll('g.bars-wrap').data(function(d) {
            var a = keys.map(function(k) {
                return {
                    data: d,
                    key: k
                };
            })
            return a;
        });

        barsWrap.enter().append('g')
            .attr('class', 'bars-wrap')
            .attr('transform', function(d) {
                return 'translate(0,' + charts(d.key) + ')';
            });

        barsWrap.append('text')
            .text(function(d) { return keyReplace[d.key]; })
            .attr('transform', 'translate(-11,' + lineHeight/4 + ')')
            .attr('text-anchor', 'end')
            .attr('dy', '.3em');

        barsWrap.append('text')
            .text(function(d) { return "% Profitable"; })
            .attr('transform', 'translate(-11,' + lineHeight/3 + ')')
            .attr('text-anchor', 'end')
            .attr('dy', '.3em');

        var bars = barsWrap.selectAll('rect').data(function(d) {
            return d.data
        });

        bars.enter().append('rect')
            .attr('fill', function(d,i,j) { return getColor(keys[j]) })
            .attr('x', function(d) { return timeX(d.year); })
            .attr('y', function(d,i,j) {
              return keys[j] == 'biotech_percent' ? biotech_percentY(d[keys[j]]) : other_percentY(d[keys[j]])
            })
            .attr('height', function(d,i,j) {
                var num = d[keys[j]];
                var funct = keys[j] == 'biotech_percent' ? biotech_percentY : other_percentY
                var yPos = funct(num);

                if(num > 0) return lineHeight/2 - yPos;
                else if(num == 0) return 0;
                else if(num < 0) {
                    return lineHeight/2 - funct(Math.abs(num));
                }
            })
            .attr('width', 5);

        barsWrap.append('g')
          .attr('class', 'z-line');

        var zLine = barsWrap.select('.z-line')
            // .attr('transform', 'translate(0,' + axes[d.key + 'Y'](0) + ')');

        zLine.append('line')
            .attr('x1', 0)
            .attr('x2', lineWidth - visPadding.middle)
            .attr('y1', function(d) {
              var funct = d.key == 'biotech_percent' ? biotech_percentY : other_percentY
              return funct(0)
            })
            .attr('y2', function(d) {
              var funct = d.key == 'biotech_percent' ? biotech_percentY : other_percentY
              return funct(0)
            });
      }

      function buildDisCorr(data) {

        var dcWrap = d3.select('g.container').data([data])
            .append('g')
            .attr('class', 'd-c-wrap')
            .attr('transform', 'translate(0,' + charts('corrDisp') + ')');

        var dcText = dcWrap.append('text')
            .attr('transform', 'translate(-11,' + lineHeight/2 + ')')
            .attr('dy', '.3em')
            .attr('text-anchor', 'end');

        dcText.append('tspan')
            .text('Biotech vs.');

        dcText.append('tspan')
            .text('Other IPOs')
            .attr('x', '0')
            .attr('y', '1.4em');

        var keys = ['biotech_ipos','other_ipos'];

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
      }

      function buildTextBox(data) {
        var tWrap = d3.select('g.container').append('g')
            .attr('class', 'text-wrap')
            .attr('transform', 'translate(' + (lineWidth + visPadding.middle - visPadding.left) + ',' + (scatterHeight + visPadding.top) + ')');

        var labels = ['Year', 'Tech Companies', 'Tech % Profitable', 'Other Companies', 'Other % Profitable'];
        var keys = ['date', 'biotech_ipos', 'biotech_percent', 'other_ipos', 'other_percent'];
        var o = labels.map(function(d,i) {
            return { label: d, key: keys[i] };
        });

        var textScale = d3.scale.ordinal();
        textScale.domain(o.map(function(d) { return d.key }))
            .range(d3.range(0,81,27))

        var ttLabel = tWrap.selectAll('text.tt-label').data(o);
        ttLabel.enter().append('text')
            .attr('class', function(d) { return 'tt-label ' + d.key })
            .attr('x', function(d,i) { return i < 3 ? 18 : scatterWidth/2 + 20 })
            .attr('y', function(d,i) { return textScale(d.key) + i%3 * 27 })
            .attr('fill', getColor)
            .text(function(d) { return d.label });

        var ttVal = tWrap.selectAll('text.tt-value').data(o);
        ttVal.enter().append('text')
            .attr('class', function(d) { return 'tt-value ' + d.key })
            .attr('y', function(d,i) { return textScale(d.key) + (i%3 * 27) + 18 })
            .attr('x', function(d,i) { return i < 3 ? 18 : scatterWidth/2 + 20 })
            .attr('text-anchor', 'start')
            .text('-');

        return ttVal;

      };


      function setupTooltips(line, text, data) {

        var line = line;

        dispatch.on('iTooltip', function(d,i,ext) {
            var x = d3.event.layerX - visPadding.left;
            var location = 0;
            var point;

            if(!d.point) {
                var leftEdges = interactiveX.range();
                var width = interactiveX.rangeBand();
                while(x > (leftEdges[location] + width)) {
                    location++
                }
                location = Math.min(++location,d.length-1)
                point = d[location];
            }

            if(d.point) {
                var dDate = d.point.year;

                line.transition().duration(300)
                    .attr('opacity',1)
                    .attr('transform', 'translate(' + (timeX(dDate) + 2) + ',0)');

            } else {
                if(!line.classed('active')) {
                    line.transition().duration(200)
                        .attr('opacity',1);
                }

                line
                    .classed('active', true)
                    .attr('transform', 'translate(' + (x + 2) + ',0)');
            }

            showText(point,i);

        });

        dispatch.on('hideTooltip', function(d,i,ext) {

            text.text('-')

            line.classed('active', false)
                .transition().duration(200)
                .attr('opacity',0);
        });

        function showText(o) {
            line.selectAll('text').text(function(d) {
              var num = o[d];
              if (d.indexOf('percent') == -1) {
                if(num === null) { return 'N/A'; }
                else { return num; }
              } else {
                if(num === null) { return 'N/A'; }
                else { return num + '%'; }
              }
            });

            text.text(function(d) {
                    if(d.key == 'date') {
                        var retDate = o['year'];
                        return retDate;
                    } else if (d.key.indexOf('percent') == -1) {
                        var retVal = o[d.key];

                        if(o[d.key] === null) { return 'N/A'; }
                        else { return retVal; }
                    } else {
                      var retVal = o[d.key];

                      if(o[d.key] === null) { return 'N/A'; }
                      else { return retVal + '%'; }
                    }

                })
                .attr('fill', function(d) { return o[d.key] < 0 ? '#D6616B' : '#000' });
        }

      }

      function buildInteractiveLayer(data) {
        var iWrap = d3.select('g.container').selectAll('g.interactive-wrap').data([data]);
        iWrap.enter().append('g').attr('class', 'interactive-wrap');

        var lineWrap = iWrap.append('g')
            .attr('class', 'line-wrap')
            .attr('opacity', 0);

        lineWrap.append('line')
            .attr('y1', 0)
            .attr('y2', chartHeight)
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('dx', 1)
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2);

        var valBoxes = lineWrap.selectAll('rect.text-box').data(['biotech_ipos','biotech_percent','other_percent','other_ipos','disp']);

        valBoxes.enter().append('rect')
            .attr('class',function(d) { return 'text-box ' + d })
            .attr('x',2)
            .attr('y', charts)
            .attr('fill', '#fff')
            .attr('height', function(d) { return d == 'corrDisp' ? 32 : 16 })
            .attr('width', 25);

        valBoxes.enter().append('text')
            .attr('x',4)
            .attr('y', function(d) { return charts(d) + 11 })
            .attr('fill', getColor)
            .text('')

        iWrap.append('rect')
            .attr('width', lineWidth - visPadding.middle)
            .attr('height', chartHeight)
            .attr('class', 'interactive-layer')
            .attr('fill', '#000')
            .attr('opacity', 0)
            .on('mouseover', dispatch.iTooltip)
            .on('mousemove', dispatch.iTooltip)
            .on('mouseout', dispatch.hideTooltip);

        return lineWrap;

      }

      scope.$watch('data', function(data) {

        var svg = d3.select(el).append('svg')
          .attr('class', 'ipo-vis')
          .attr("width", chartWidth)
          .attr("height", chartHeight)

        var container = d3.select('svg').append('g')
            .attr('class', 'container')
            .attr('transform', 'translate(' + visPadding.left + ',' + visPadding.top + ')');

        var skeleton = buildSkeleton(data);
        var disCorrLines = buildDisCorr(data);
        var alphaBars = buildAlpha(data);
        var text = buildTextBox(data);
        var interactiveLayer = buildInteractiveLayer(data);
        var tooltips = setupTooltips(interactiveLayer, text, data);

    });

  }

    return {
      link: link,
      restrict: 'E',
      scope: {data: "="}
    }

  });
