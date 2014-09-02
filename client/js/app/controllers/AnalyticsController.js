"use strict";

angular.module("playlytics")
  .controller("AnalyticsController", function($scope, playlist) {

    $scope.playlist = playlist;

    AmCharts.makeChart("analyticsChart", {
      "type": "serial",
      "theme": "dark",
      "dataProvider": playlist.analytics,
      "valueAxes": [{
        "gridColor":"#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "lineColor": "#84BD00",
        "type": "column",
        "valueField": "coolness"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "timestamp",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition":"start",
        "tickLength":20
      }
    });

  });