$(function () {

    var data = [
        {
            "hc-key": "id-ac",
            "value": 0,
            // flag: '_England',
            data: [10, 15, 17, 20]
        },
        {
            "hc-key": "id-jr",
            "value": 3,
            // flag: '_England',
            data: [30, 20, 27, 30]
        },
        {
            "hc-key": "id-kt",
            "value": 4,
            // flag: '_England',
            data: [55, 76, 26, 13]
        },
        {
            "hc-key": "id-kb",
            "value": 2,
            // flag: '_England',
            data: [55, 76, 26, 13]
        }
    ],
        mapChart,
        countryChart,
        categories = ['1998', '1999', '2000', '2001']

    var mapData = Highcharts.geojson(Highcharts.maps['countries/id/id-all']);

    Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var points = mapChart.getSelectedPoints();
        if (points.length) {
            if (points.length === 1) {
                // $('#info #flag').attr('class', 'flag ' + points[0].flag);
                $('#info h2').html(points[0].name);
            } else {
                // $('#info #flag').attr('class', 'flag');
                $('#info h2').html('Comparing countries');
            }
            $('#info .subheader').html('<h4>Historical population</h4><small><em>Shift + Click on map to compare countries</em></small>');
            if (!countryChart) {
                countryChart = $('#country-chart').highcharts({
                    chart: {
                        height: 250,
                        spacingLeft: 0
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    subtitle: {
                        text: null
                    },
                    xAxis: {
                        tickPixelInterval: 50,
                        crosshair: true,
                        categories: categories
                    },
                    yAxis: {
                        title: null,
                        opposite: true
                    },
                    tooltip: {
                        shared: true
                    },
                    plotOptions: {
                        series: {
                            threshold: 0,
                        }
                    }
                }).highcharts();
            }
            $.each(points, function (i) {
                if (countryChart.series[i]) {
                    countryChart.series[i].update({
                        name: this.name,
                        data: this.data,
                        type: points.length > 1 ? 'line' : 'area'
                    }, false);
                } else {
                    countryChart.addSeries({
                        name: this.name,
                        data: this.data,
                        type: points.length > 1 ? 'line' : 'area'
                    }, false);
                }
            });
            while (countryChart.series.length > points.length) {
                countryChart.series[countryChart.series.length - 1].remove(false);
            }
            countryChart.redraw();
        } else {
            //   $('#info #flag').attr('class', '');
            $('#info h2').html('');
            $('#info .subheader').html('');
            if (countryChart) {
                countryChart = countryChart.destroy();
            }
        }
    });
    mapChart = $('#container').highcharts('Map', {

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: 0,
            max: 100
        },
        series: [{
            data: data,
            mapData: mapData,
            joinBy: 'hc-key',
            allowPointSelect: true,
            cursor: 'pointer',
            states: {
                select: {
                    color: '#a4edba',
                    borderColor: 'black',
                }
            }
        }]
    }).highcharts();
});
