
  // Global constants
  var group = false;
  var choosen_metric = 'euclidean';
  var choosen_smooth = 'landmarks';
  var outlier_count=1;
  var method="2phase"

  // imports and setups
  _.mixin(_.str.exports());
  $.ajaxSetup({
    timeout: 1000000,
  });

  // code

  $('#simdata-form').submit(function (e) {
    getDataNow();
    return false;
  });

  function filterData(data) {
    return _.filter(data, function(val) {
      return _(val.x_type).startsWith('category');
    });
  }

  function genJSModel(data, cluster_info, combine) {
    // data can be single data obj or multiple data obj...

    // sanity check
    _.each(cluster_info, function (id) {
      // console.log("num pts: " + id.toString() + ' ' + data[id].data.length);
    });

    var all_series;
    if (combine) {
      all_series = _.map(cluster_info, function(id) {
        var datum = data[id];
        return {
          name: datum.x_type,
          data: ts2ms(datum.data),
        };
      });
    } else {
      var id = cluster_info[0]
      var datum = data[id];
      all_series = [
        {
          name: datum.x_type,
          data: ts2ms(datum.data),
          yAxis: 0,
          index: 1,
          color: 'red',
        },
      ];
    }

    var chart_data = {
      // chart: { type: 'spline' },
      chart: {
        width: 325,
        height: 255,
      },
      credits: {
        enabled: false
      },
      legend: {
        adjustChartSize: true,
      },
      title: {
        text: '',
        // style: {
          // display: 'none'
        // }
      },
      xAxis: {
        type: 'linear',
        //tickInterval: 1
      },
      yAxis: [
        {
          title: { text: 'Aggregate' },
          tooltip: {
            crosshairs: true,
            shared: true
          },
        },
        {
          title: { text: '' },
          tooltip: {
            shared: true,
            crosshairs: true,
          },
          opposite: true,
        }
      ]
      ,
      plotOptions: {
        line: {
          animation: false,
          lineWidth: 1,
          // lineColor: '#666666',
          marker: {
            radius: 1,
          }
        }
      },
      series: all_series,

    }

    return chart_data;
  }

  var sd_header, sd_data;

  function processData(data) {
    console.log("start processing");
    var allcharts = [];

    //var header = data[0];
    //var clusters = header.clusters;
    //data = data.slice(1);
    //data = filterData(data);
    console.log('total charts: ' + data.length);

    sd_data = data;
    //sd_header = header;
    clusters=[];
     for (var id=0; id<data.length; id++)
        clusters.push([id]);


    var combine = false;
    var cmp_menu_items = [];

    _.each(clusters, function(cluster) {
      _.each(cluster, function(i) {
        // console.log(i);
        // console.log(data);
        var name = data[i].x_type;
        cmp_menu_items.push([i, name]);
      });
    });

    cmp_menu_items.sort(function(a,b) {
      return a[1].localeCompare(b[1]);
    });

    _.each(cmp_menu_items, function(item) {
      $('#compare-menu').append('<li><a href="#" data-id="' + item[0] + '">' + item[1] + '</a></li>');
    });

    initCompareMenu();
    console.log(clusters);
    _.each(clusters, function(cluster) {

      if (combine) {
        console.log("in combine");
        var chartData = genJSModel(data, cluster);
        var chart = $('<div class="viz"></div>');
        allcharts.push(chart);
        console.log(chartData);
        chart.highcharts(chartData);
        chart.appendTo('div#container');
      } else {
        console.log("in else");
        if (group) {
          var cont = $('<div></div>');
          cont.css('clear', 'both');
          cont.css('border-bottom', '1px solid black');
        }
        _.each(cluster, function(id) {
          var chartData = genJSModel(data, [id]);
          var chart = $('<div class="viz"></div>');
          chart.attr('id', 'viz-' + id);
          allcharts.push(chart);
          chart.highcharts(chartData);
          console.log(chartData);
          if (group) {
            chart.appendTo(cont);
          } else {
            text=chartData.series[0].name;
            if(text.indexOf("Outlier") > -1)
               chart.appendTo('div#container1');
            else if(text.indexOf("Representative") > -1)
               chart.appendTo('div#container2');
            else chart.appendTo('div#container3');



          }
        });
        if (group) {
          cont.appendTo('div#container');
        }
      }
    });
  }

  function getData(query,outlier_count,method) {
    console.log(query);
    $('div#container').empty();
    $('#compare-menu').html('<li><a href="#" class="active" data-id="-1">Show All</a></li>');
    $.get('/getdata', { sql: query, outlier_count: 3, method: method}, processesBackEndData, 'json')
      .fail(function() {
        console.log("Failed")
        alert('Request failed: /getdata');
      });
  }

  function get_sim(r,c,n) {
    if (r > c) {
      var tmp = r;
      r = c;
      c = tmp;
    }
    return r*((n-1-(r-1)) + (n-1))/2 + (c-r-1);
  }

  function compareChart(id) {
    var vals = [];
    for (var i=0; i<sd_data.length; i++) {
      if (i == id) continue;
      var sim = sd_header.dist[get_sim(id, i, sd_data.length)];
      vals.push([i, sim]);
    }
    vals.sort(function(a,b) {
      return a[1] - b[1];
    });
    vals = [[id, 0.0]].concat(vals);
    console.log(_.map(vals, function(x) { return x[0]; }));
    console.log(_.map(vals, function(x) { return x[1]; }));

    var cont = $('div#container');
    _.each(vals, function(x) {
      var xid = x[0];
      var viz = $('#viz-' + xid).detach();
      viz.appendTo(cont);
    });
  }

  function getDataNow() {
    getData("select uniqueCarrier,DayofMonth,avg(ArrDelay) from db.ontime group by uniqueCarrier,DayofMonth",outlier_count,method);
  }

  //getDataNow();

  $('#metric-menu > li > a').click(
    function(e) {
      choosen_metric = $(this).attr('data-metric');
      $('#metric-menu > li > a.active').removeClass();
      $(this).addClass('active');
      getDataNow();
    }
  );

  $('#smooth-menu > li > a').click(
    function(e) {
      choosen_smooth = $(this).attr('data-metric');
      $('#smooth-menu > li > a.active').removeClass();
      $(this).addClass('active');
      getDataNow();
    }
  );

   $('#outlier_count-menu > li > a').click(
    function(e) {
      outlier_count = $(this).attr('data-metric');
      $('#outlier_count-menu > li > a.active').removeClass();
      $(this).addClass('active');
      $('#container1').empty();
      $('#container2').empty();
      $('#container3').empty();
      getDataNow();
    }
  );

    $('#method-menu > li > a').click(
    function(e) {
      method = $(this).attr('data-metric');
      $('#method-menu > li > a.active').removeClass();
      $(this).addClass('active');
      $('#container1').empty();
      $('#container2').empty();
      $('#container3').empty();
      getDataNow();
    }
  );

  function initCompareMenu() {
    $('#compare-menu > li > a').click(
      function(e) {
        var choosen_chart = parseInt($(this).attr('data-id'));
        $('#compare-menu > li > a.active').removeClass();
        $(this).addClass('active');
        if (choosen_chart >= 0) {
          compareChart(choosen_chart);
        }
      }
    );
  }
