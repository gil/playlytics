"use strict";

angular.module("playlytics", ["appTemplates", "ui.router", "ui.sortable", "ngTagsInput"])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/playlist/new");

    $stateProvider
      .state("playlist", {
        url: "/playlist/:id",
        templateUrl: "templates/playlist.tpl.html",
        controller: "PlaylistController",
        resolve: {
          playlist : ["PlaylistService", "$stateParams", function(PlaylistService, $stateParams) {
            return PlaylistService.read( $stateParams.id );
          }]
        }
      })
      .state("analytics", {
        url: "/playlist/:id/analytics",
        templateUrl: "templates/analytics.tpl.html",
        controller: "AnalyticsController",
        resolve: {
          playlist : ["PlaylistService", "$stateParams", function(PlaylistService, $stateParams) {
            return PlaylistService.read( $stateParams.id );
          }]
        }
      });

    $httpProvider.defaults.headers.common = {
      "Content-Type": "application/json"
    };

  });