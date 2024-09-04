Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {
    proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    var points = mapChart.getSelectedPoints();
    if (points.length) {
        if (!countryChart) {
            countryChart = Highcharts.chart('divGrafCES_3', {
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
                    crosshair: true
                },
                yAxis: {
                    title: null,
                    opposite: true,
                    min: 70,
                    labels: {
                        formatter: function () {
                            return Highcharts.numberFormat(this.value, 0, "", ".");
                        }
                    }
                },
                tooltip: {
                    split: true,
                    shared: true,
                    pointFormatter: function () {
                        return "<span style='color:{point.color}'></span> " + this.series.name + ": <b>" + Highcharts.numberFormat(this.y, 0, "", ".") + "</b><br/>";
                    }
                },
                colors: ['#E99005', '#8AAD6C', '#A388BD', '#35B1CA', '#E2DCCC', '#CF7A55', '#C2D269', '#F2C52C', '#AAA788', '#29A570', '#6B5A4E', '#98E0DF', '#ED146F', '#9CBABB', '#666666', '#EDBEF4', '#3FCBFF', '#3675D4'],
                plotOptions: {
                    series: {
                        animation: {
                            duration: 500
                        },
                        marker: {
                            enabled: false
                        },
                        threshold: 0,
                        pointStart: parseInt(categories[0], 10)
                    }
                }
            });
        }

        $.each(points, function (i) {
            // Update
            if (countryChart.series[i]) {
                countryChart.series[i].update({
                    name: this.municipio,
                    data: countries[this.code3].data,
                    type: 'line'
                }, false);
            } else {
                countryChart.addSeries({
                    name: this.municipio,
                    data: countries[this.code3].data,
                    type: 'line'
                }, false);
            }
        });
        while (countryChart.series.length > points.length) {
            countryChart.series[countryChart.series.length - 1].remove(false);
        }
        countryChart.redraw();

    } else {
        $('#info #flag').attr('class', '');
        $('#info h2').html('');
        if (countryChart) {
            countryChart = countryChart.destroy();
        }
    }
});