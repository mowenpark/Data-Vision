angular.module('visOne')
  .directive('barLineChart', function () {

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
      var scatterWidth = scatterHeight = chartWidth - lineWidth - visPadding.left - visPadding.right;

      getColor = function(d) {
           if(d.key) return axes.chartColors(d.key);
           else return axes.chartColors(d);
       }

      window.buildChart = function(data) {
          axes = new Axes(data);

          container = d3.select(el).selectAll('g.container').data(data);
          container.enter().append('g')
              .attr('class', 'container')
              .attr('transform', 'translate(' + visPadding.left + ',' + visPadding.top + ')');

          // var skeleton = buildSkeleton(data);
          // var disCorrLines = buildDisCorr(data);
          // var alphaBars = buildAlpha(data);
          // var scatter = buildScatter(data);
          // var text = buildTextBox(data);
          // var interactiveLayer = buildInteractiveLayer(data);
          // var tooltips = setupTooltips(scatter, interactiveLayer, text, data);
      }

      function buildSkeleton(data) {

          var xAxis = d3.svg.axis()
              .scale(axes.timeX)
              .orient('bottom');

          container.append('g')
              .attr('class', 'x-axis')
              .attr('transform', 'translate(0,' + (axes.charts('corrDisp') + axes.lineY(0)) + ')')
              .call(xAxis);
      }


      function Axes(data) {

        this.chartColors = d3.scale.ordinal();
        this.chartColors
            .domain(['corr', 'disp', 'hfu', 'hfri', 'fof', 'date'])
            .range(['#FC9E27', '#3A7FA3', '#B5CF6B', '#D6616B', '#E7BA52', '#888']);

        this.timeX = d3.time.scale();

        debugger

        var dateStart = new Date(data[0].date);
        var dateEnd = new Date(data[data.length - 1].date);

        this.timeX.domain([dateStart,dateEnd]);
        this.timeX.range([0,lineWidth-visPadding.middle]);

        this.interactiveX = d3.scale.ordinal();
        this.interactiveX.domain(d3.range(0,data.length,1));
        this.interactiveX.rangeBands([0,lineWidth - visPadding.middle])

        var maxD = d3.max(data, function(d) { return d.disp; });
        var maxC = d3.max(data, function(d) { return d.corr; });
        var maxDC = d3.max([maxD, maxC]);

        var minD = d3.min(data, function(d) { return d.disp; });
        var minC = d3.min(data, function(d) { return d.corr; });
        var minDC = d3.min([minD, minC]);

        this.lineY = d3.scale.linear();
        this.lineY.domain([minDC < 0 ? minDC : 0, maxDC]);
        this.lineY.range([lineHeight,0]);

        var maxFOF = d3.max(data, function(d) { return d.fof; });
        var maxHFRI = d3.max(data, function(d) { return d.hfri; });
        var maxHFU = d3.max(data, function(d) { return d.hfu; });


        var minFOF = d3.min(data, function(d) { return d.fof; });
        var minHFRI = d3.min(data, function(d) { return d.hfri; });
        var minHFU = d3.min(data, function(d) { return d.hfu; });


        var fofBound = Math.max(Math.abs(minFOF), Math.abs(maxFOF));
        var hfriBound = Math.max(Math.abs(minHFRI), Math.abs(maxHFRI));
        var hfuBound = Math.max(Math.abs(minHFU), Math.abs(maxHFU));

        this.fofY = d3.scale.linear();
        this.fofY.domain([-fofBound, 0, fofBound])
        this.fofY.range([lineHeight/2, lineHeight/2, 0]);

        this.hfriY = d3.scale.linear();
        this.hfriY.domain([-hfriBound, 0, hfriBound])
        this.hfriY.range([lineHeight/2, lineHeight/2, 0]);

        this.hfuY = d3.scale.linear();
        this.hfuY.domain([-hfuBound, 0, hfuBound])
        this.hfuY.range([lineHeight/2, lineHeight/2, 0]);

        //For scatter only
        var maxFH = d3.max([maxFOF,maxHFU]);
        var minFH = d3.min([minFOF,minHFU]);

        var alphaBound = Math.max(Math.abs(minFH), Math.abs(maxFH));
        this.alphaY = d3.scale.linear();
        this.alphaY.domain([-alphaBound, 0,alphaBound]);
        this.alphaY.range([12, 2, 12]);

        this.quadrants = {};
        this.quadrants.hfu = d3.scale.linear();
        this.quadrants.fof = d3.scale.linear();

        this.scatterX = d3.scale.linear();
        this.scatterY = d3.scale.linear();

        var medD = d3.median(data, function(d) { return d.disp; });
        var medC = d3.median(data, function(d) { return d.corr; });
        this.scatterX.domain([minC, medC, maxC]);
        this.scatterY.domain([minD, medD, maxD]);

        this.scatterX.range([0, scatterWidth/2, scatterWidth]);
        this.scatterY.range([scatterHeight, scatterHeight/2, 0]);

        var cDHeight = 3*(lineHeight + chartPadding);
        this.charts = d3.scale.ordinal();
        this.charts
            .domain(['corr','disp','corrDisp', 'hfri', 'hfu', 'fof'])
            .range([3*(lineHeight + chartPadding), 3*(lineHeight + chartPadding) + 13, 3*(lineHeight + chartPadding), 2*(lineHeight + chartPadding), (lineHeight + chartPadding), 0]);

        };

    };


    return {
      link: link,
      restrict: 'E',
      scope: {data: "="}
    }

  });
